import { MultiAddress, westend } from "@capi/westend"
import { ss58 } from "capi"
import { pjsSender } from "capi/patterns/compat/pjs_sender"
import { signature } from "capi/patterns/signature/polkadot"
import { defaultExtension } from "../../../signals/accounts.js"
import { AccountId } from "../../AccountId.js"
import { Button } from "../../Button.js"
import { IconTrash } from "../../icons/IconTrash.js"
import { goPrev } from "../Wizard.js"
import { formData } from "./formData.js"

const sender = pjsSender(westend, defaultExtension.value?.signer)

export function TransactionSign() {
  const { value: { from, to, amount, callHash } } = formData

  async function sign() {
    const destPubKey = ss58.decode(to)[1]
    await westend.Balances
      .transfer({
        value: BigInt(amount),
        dest: MultiAddress.Id(destPubKey),
      }).signed(signature({ sender: sender(from?.address!) }))
      .sent()
      .dbgStatus("Transfer:")
      .finalizedEvents()
      .run()
  }

  return (
    <div className="flex flex-col gap-6 divide-y divide-divider">
      <h2 className="text-black text-xl ">Sign transaction</h2>
      <div className="pt-6">{`0x${callHash}`}</div>
      <div className="pt-6">Existing approvals: 0/?</div>
      <div className="flex flex-wrap pt-6">
        <div className="mr-2">{`Sending ${amount} WND from `}</div>
        <AccountId address={from?.address} name={from?.name} />
        <div>to {to}</div>
      </div>
      <div className="flex flex-wrap pt-6">
        <div className="mr-2">Creator</div>
        <AccountId address={from?.address} name={from?.name} />
      </div>
      <div className="flex flex-wrap pt-6">
        <div className="mr-2">Signing as:</div>
        <AccountId address={from?.address} name={from?.name} />
      </div>
      <div>
        <div class="pt-4 flex justify-end">
          <Button
            variant="danger"
            onClick={() => goPrev()}
            iconLeft={<IconTrash className="w-6" />}
            className="mr-4"
          >
            Discard
          </Button>
          <Button variant="primary" onClick={() => sign()}>
            Sign
          </Button>
        </div>
      </div>
    </div>
  )
}
