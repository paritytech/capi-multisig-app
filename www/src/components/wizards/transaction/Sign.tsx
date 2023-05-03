import { AccountId } from "../../AccountId.js"
import { Button } from "../../Button.js"
import { IconTrash } from "../../icons/IconTrash.js"
import { goPrev } from "../Wizard.js"
import { formData } from "./formData.js"

export function TransactionSign() {
  const { value: { from, to, amount, callHash } } = formData

  return (
    <div className="flex flex-col gap-6 divide-y divide-divider">
      <h2 className="text-black text-xl ">Sign transaction</h2>
      <div className="pt-6">{`0x${callHash}`}</div>
      <div className="pt-6">Existing approvals: 0/?</div>
      <div className="flex flex-wrap pt-6">
        <div className="mr-2">{`Sending ${amount} WND from `}</div>
        <AccountId account={from} />
        <div>to {to}</div>
      </div>
      <div>
        <div class="pt-4 flex justify-end">
          <Button
            variant="danger"
            onClick={goPrev}
            iconLeft={<IconTrash className="w-6" />}
            className="mr-4"
          >
            Discard
          </Button>
          <Button variant="primary">
            Sign
          </Button>
        </div>
      </div>
    </div>
  )
}
