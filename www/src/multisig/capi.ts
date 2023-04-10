import { Balances, chain, Proxy, System } from "@capi/westend"
import { MultiAddress } from "@capi/westend/types/sp_runtime/multiaddress.js"
import { ss58 } from "capi"
import { accounts, defaultExtension } from "../signals/accounts.js"
import { filterPureCreatedEvents } from "./patterns/events.js"
import { MultisigRune } from "./patterns/MultisigRune.js"
import { pjsSender } from "./patterns/sender.js"
import { signature } from "./patterns/signature.js"

if (!accounts.value) throw new Error("No accounts found")

const acc = accounts.value.slice(0, 3).map(({ address }) => {
  return {
    address,
    publicKey: ss58.decode(address)[1],
  }
})

const alexa = acc[0]!
const billy = acc[1]!
const carol = acc[2]!

const sender = pjsSender(chain, defaultExtension.value?.signer)

// Initialize the `MultisigRune` with Alexa, Billy and Carol. Set the passing threshold to 2.
const multisig = MultisigRune.from(chain, {
  signatories: [alexa, billy, carol].map(({ publicKey }) => publicKey),
  threshold: 2,
})

// Send funds to the multisig (existential deposit).
await Balances
  .transfer({
    value: 20_000_000_000_000n,
    dest: multisig.address,
  })
  .signed(signature({ sender: sender(alexa.address) }))
  .sent()
  .dbgStatus("Existential deposit:")
  .finalized()
  .run()

// Describe the call which we wish to dispatch from the multisig account:
// the creation of the stash / pure proxy, belonging to the multisig account itself.
const call = Proxy.createPure({
  proxyType: "Any",
  delay: 0,
  index: 0,
})

// Propose the stash creation call.
await multisig
  .ratify({ call, sender: MultiAddress.Id(alexa.publicKey) })
  .signed(signature({ sender: sender(alexa.address) }))
  .sent()
  .dbgStatus("Proposal:")
  .finalized()
  .run()

// Approve the stash creation call and extract the pure creation event, which should
// contain its account id.
const stashAccountId = await multisig
  .ratify({ call, sender: MultiAddress.Id(billy.publicKey) })
  .signed(signature({ sender: sender(billy.address) }))
  .sent()
  .dbgStatus("Final approval:")
  .finalizedEvents()
  .pipe(filterPureCreatedEvents)
  .access(0, "pure")
  .run()

// Send funds to the stash (existential deposit).
await Balances
  .transfer({
    value: 20_000_000_000_000n,
    dest: MultiAddress.Id(stashAccountId),
  })
  .signed(signature({ sender: sender(alexa.address) }))
  .sent()
  .dbgStatus("Fund Stash:")
  .finalized()
  .run()

// Ensure that the funds arrived successfully.
const stashFree = await System.Account
  .value(stashAccountId)
  .unhandle(undefined)
  .access("data", "free")
  .run()

// The stash's free should be greater than zero.
console.log("Stash free:", stashFree)
