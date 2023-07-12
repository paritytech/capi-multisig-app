import { signal } from "@preact/signals"
import { useNavigate } from "react-router-dom"
import { notificationsCb } from "../../../api/notificationsCb.js"
import { ratify } from "../../../api/ratify.js"
import { createTransferCall } from "../../../api/transferCall.js"
import { defaultAccount } from "../../../signals/accounts.js"
import { storageClient } from "../../../storage/index.js"
import { handleException } from "../../../util/events.js"
import { AccountId } from "../../AccountId.js"
import { Button } from "../../Button.js"
import { IconTrash } from "../../icons/IconTrash.js"
import { goPrev } from "../Wizard.js"
import { transactionData } from "./formData.js"

const isSubmitting = signal(false)

export function TransactionSign() {
  const { from, to, amount, callHash, setup } = transactionData.value

  const navigate = useNavigate()

  async function sign() {
    if (!setup) throw new Error("No setup found!")

    isSubmitting.value = true
    const call = createTransferCall(setup.stash, to, amount)

    try {
      await ratify(setup, call, notificationsCb)
      storageClient.storeCall(call)
      navigate("/")
    } catch (error) {
      handleException(error)
    } finally {
      isSubmitting.value = false
    }
  }

  return (
    <div className="flex flex-col gap-6 divide-y divide-divider">
      <h2 className="text-black text-xl ">Sign transaction</h2>
      <div className="pt-6">{`0x${callHash}`}</div>
      <div className="pt-6">{`Existing approvals: 0/${setup?.threshold}`}</div>
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
        <AccountId
          address={defaultAccount.value?.address}
          name={defaultAccount.value?.name}
        />
      </div>
      <div>
        <div class="pt-4 flex justify-end">
          <Button
            variant="danger"
            onClick={goPrev}
            iconLeft={<IconTrash className="w-6" />}
            className="mr-4"
            disabled={isSubmitting.value}
          >
            Discard
          </Button>
          <Button
            variant="primary"
            onClick={sign}
            disabled={isSubmitting.value}
          >
            Sign
          </Button>
        </div>
      </div>
    </div>
  )
}
