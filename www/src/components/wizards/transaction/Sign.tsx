import { westend } from "@capi/westend"
import { signature } from "capi/patterns/signature/polkadot"
import { defaultAccount, defaultSender } from "../../../signals/accounts.js"
import {
  toMultiAddressIdRune,
  toMultisigRune,
} from "../../../util/capi-helpers.js"

import { useState } from "preact/hooks"
import { useNavigate } from "react-router-dom"
import { storageClient } from "../../../storage/index.js"
import { toBalance } from "../../../util/balance.js"
import { filterEvents, handleException } from "../../../util/events.js"
import { AccountId } from "../../AccountId.js"
import { Button } from "../../Button.js"
import { IconTrash } from "../../icons/IconTrash.js"
import { goPrev } from "../Wizard.js"
import { transactionData } from "./formData.js"

export function TransactionSign() {
  const [isSubmitting, setSubmitting] = useState(false)
  const { from, to, amount, callHash, setup } = transactionData.value
  const navigate = useNavigate()

  function sign() {
    const sender = defaultSender.value
    const account = defaultAccount.value
    if (!setup || !sender || !account) return
    setSubmitting(true)

    const multisig = toMultisigRune(setup)
    const dest = toMultiAddressIdRune(to)
    const user = toMultiAddressIdRune(account.address)
    const stash = toMultiAddressIdRune(setup.stash)
    const value = toBalance(amount)

    // Transfer Call from Stash
    const call = westend.Proxy.proxy({
      real: stash,
      call: westend.Balances.transfer({
        dest,
        value,
      }),
    })

    const ratifyCall = multisig
      .ratify(user, call)
      .signed(signature({ sender }))
      .sent()
      .dbgStatus("Ratify")
      .inBlockEvents()
      .unhandleFailed()
      .pipe(filterEvents)

    ratifyCall
      .run()
      .then(() => storageClient.storeCall(call))
      .then(() => {
        setSubmitting(false)
        navigate("/")
      })
      .catch((exception) => {
        handleException(exception)
        setSubmitting(false)
      })
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
            disabled={isSubmitting}
          >
            Discard
          </Button>
          <Button variant="primary" onClick={sign} disabled={isSubmitting}>
            Sign
          </Button>
        </div>
      </div>
    </div>
  )
}
