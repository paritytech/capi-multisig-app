import { chain, Proxy, Westend } from "@capi/westend"
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
  members: Account[]
  threshold: number
  creator: WalletAccount
  multisig: MultisigRune<Westend, never>
  sender = pjsSender(chain, getWalletBySource("polkadot-js")?.signer)
  stash?: Account

  constructor(
    members: WalletAccount[],
    threshold: number,
    creator: WalletAccount,
  ) {
    this.members = members.map(({ address }) => {
      return {
        address,
        publicKey: ss58.decode(address)[1],
      }
    })
    this.threshold = threshold
    this.creator = creator
    this.multisig = MultisigRune.from(chain, {
      signatories: this.members.map(({ publicKey }) => publicKey),
      threshold,
    })
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

  async createStash() {
    const call = Proxy.createPure({
      proxyType: "Any",
      delay: 0,
      index: 0,
    })
    const x = await this.propose(this.members[0]!, call)
    console.log(x)
  }
}
