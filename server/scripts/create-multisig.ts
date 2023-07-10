import { MultiAddress, westend } from "@capi/westend"
import { hex, Rune, Sr25519, ss58 } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import {
  filterPureCreatedEvents,
  replaceDelegateCalls,
} from "capi/patterns/proxy"
import { signature } from "capi/patterns/signature/polkadot"

const args = process.argv.slice(2)
if (args.length < 3) {
  throw new Error("3 secret keys are required")
}
const secret1 = hex.decode(args[0]!)
const secret2 = hex.decode(args[1]!)
const secret3 = hex.decode(args[2]!)

const alice = Sr25519.fromSecret(secret1)
const bob = Sr25519.fromSecret(secret2)
const charlie = Sr25519.fromSecret(secret3)

const multisig = MultisigRune.from(westend, {
  signatories: [alice, bob, charlie].map(({ publicKey }) => publicKey),
  threshold: 2,
})

await multisig
  .fund(1_000_000_000_000n)
  .signed(signature({ sender: alice }))
  .sent()
  .dbgStatus("Multisig Existential deposit:")
  .finalized()
  .run()

const stash: Uint8Array = await westend.Proxy.createPure({
  proxyType: "Any",
  delay: 0,
  index: 0,
}).signed(signature({ sender: alice }))
  .sent()
  .dbgStatus("Create Stash:")
  .finalizedEvents()
  .unhandleFailed()
  .pipe(filterPureCreatedEvents)
  .map((events: { pure: Uint8Array }[]) => events.map(({ pure }) => pure))
  .access(0)
  .run()

await westend.Balances
  .transfer({
    value: 1_000_000_000_000n,
    dest: MultiAddress.Id(stash),
  })
  .signed(signature({ sender: alice }))
  .sent()
  .dbgStatus("Stash Existential deposit:")
  .finalized()
  .run()

await westend.Utility.batchAll({
  calls: Rune.array(replaceDelegateCalls(
    westend,
    MultiAddress.Id(stash),
    alice.address,
    multisig.address,
  )),
}).signed(signature({ sender: alice }))
  .sent()
  .dbgStatus("Ownership swaps:")
  .finalized()
  .run()

const address = ss58.encode(westend.System.SS58Prefix, stash)

console.log("stash address:", address)
