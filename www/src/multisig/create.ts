import { Balances, chain, Proxy, Westend } from "@capi/westend"
import { MultiAddress } from "@capi/westend/types/sp_runtime/multiaddress.js"
import { getWalletBySource, WalletAccount } from "@talisman-connect/wallets"
import { ExtrinsicRune, ss58 } from "capi"
import { filterPureCreatedEvents } from "./patterns/events.js"
import { MultisigRune } from "./patterns/MultisigRune.js"
import { pjsSender } from "./patterns/sender.js"
import { signature } from "./patterns/signature.js"

type Account = {
  address: string
  publicKey: Uint8Array
}

export class PureProxyMultisig {
  readonly members: Account[]
  readonly threshold: number
  readonly creator: WalletAccount
  readonly multisig: MultisigRune<Westend, never>
  sender = pjsSender(chain, getWalletBySource("polkadot-js")?.signer)
  stash?: Account

  constructor(
    members: WalletAccount[],
    threshold: number,
    creator: WalletAccount,
  ) {
    this.members = members.map(({ address }) =>
      PureProxyMultisig.createAccount(address)
    )
    this.threshold = threshold
    this.creator = creator
    this.multisig = MultisigRune.from(chain, {
      signatories: this.members.map(({ publicKey }) => publicKey),
      threshold,
    })
    this.fund(creator.address, 1000000000000n)
  }

  async fund(senderAddress: string, amount: bigint) {
    return await Balances
      .transfer({
        value: amount,
        dest: this.multisig.address,
      })
      .signed(signature({ sender: this.sender(senderAddress) }))
      .sent()
      .dbgStatus("Existential deposit:")
      .finalized()
      .run()
  }

  static createAccount(address: string): Account {
    const publicKey = ss58.decode(address)[1]
    return {
      address,
      publicKey,
    }
  }

  async propose(sender: Account, call: ExtrinsicRune<Westend, never>) {
    return await this.multisig
      .ratify({ call, sender: MultiAddress.Id(sender.publicKey) })
      .signed(signature({ sender: this.sender(sender.address) }))
      .sent()
      .dbgStatus("Proposal:")
      .finalized()
      .run()
  }

  async approve(sender: Account, call: ExtrinsicRune<Westend, never>) {
    return await this.multisig
      .ratify({ call, sender: MultiAddress.Id(sender.publicKey) })
      .signed(signature({ sender: this.sender(sender.address) }))
      .sent()
      .finalizedEvents()
      .pipe(filterPureCreatedEvents)
      .access(0, "pure")
      .run()
  }

  async createStash(senderAddress: string) {
    const sender = PureProxyMultisig.createAccount(senderAddress)
    const call = Proxy.createPure({
      proxyType: "Any",
      delay: 0,
      index: 0,
    })
    const x = await this.propose(sender, call)
    console.log(x)
  }
}
