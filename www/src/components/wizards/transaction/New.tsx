import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { hex } from "capi"
import { useEffect } from "preact/hooks"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { setups } from "../../../signals/setups.js"
import { formatBalance } from "../../../util/balance.js"
import { AccountId } from "../../AccountId.js"
import { AccountSelect } from "../../AccountSelect.js"
import { AddressInput } from "../../AddressInput.js"
import { BalanceInput } from "../../BalanceInput.js"
import { Button } from "../../Button.js"
import { SumTable } from "../../SumTable.js"
import { goNext } from "../Wizard.js"
import {
  FormData,
  formDataSchema,
  TransactionData,
  transactionData,
  updateTransactionData,
} from "./formData.js"
import { call, fee, selectedAccount } from "./signals.js"

export function TransactionNew() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<FormData> = async (formDataNew) => {
    if (!call.value) return
    const callHash = hex.encode(await call.value.callHash.run())
    const callData = hex.encode(await call.value.callData.run())
    const selectedSetup = setups.peek().find((s) =>
      s.multisig === formDataNew.from?.address
    )
    updateTransactionData({
      ...formDataNew,
      callHash,
      callData,
      setup: selectedSetup,
    })
    goNext()
  }

  useEffect(() => {
    const subscription = watch((data) => {
      updateTransactionData(data as TransactionData)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const fromAccounts = setups.value.map((s) => ({
    name: s.name,
    address: s.multisig,
    source: "",
  }))
  let queryMultisig = useSearchParams()[0].get("multisig")
  const defaultFromAccount = queryMultisig
    ? fromAccounts.find((a) => a.address === queryMultisig)
    : undefined

  return (
    <div className="flex flex-col gap-6 divide-y divide-divider">
      <h2 className="text-black text-xl ">New transaction</h2>
      <form
        class="flex flex-col gap-4 w-full divide-y divide-divider"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div class="flex flex-col gap-4">
          <div className="space-y-2">
            <p className="mt-4 text-[#321D47]">Initiated by:</p>
            <AccountId
              address={selectedAccount.value?.address}
              name={selectedAccount.value?.name}
            />
          </div>
          <div className="space-y-2">
            <Controller
              control={control}
              defaultValue={transactionData.value.amount}
              name="amount"
              render={({ field }) => (
                <BalanceInput
                  {...field}
                  label="Send"
                  required
                  error={errors.amount?.message}
                  className="w-1/3"
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <p>From:</p>
            <Controller
              control={control}
              name={`from`}
              defaultValue={defaultFromAccount}
              render={({ field }) => (
                <AccountSelect {...field} accounts={fromAccounts} />
              )}
            />
          </div>
          <div className="space-y-2">
            <p>To:</p>
            <Controller
              control={control}
              defaultValue={transactionData.value.to}
              name="to"
              rules={{ required: true }}
              render={({ field }) => (
                <AddressInput {...field} placeholder="Address" />
              )}
            />
            {errors.to && (
              <p className="text-xs text-red-500">{errors.to?.message}</p>
            )}
          </div>
        </div>
        <div class="pt-4">
          <SumTable unit="WND">
            <SumTable.Row
              name="Send"
              value={transactionData.value.amount.toFixed(4)}
            />
            <SumTable.Row
              name="Transaction Fee"
              value={formatBalance(fee.value)}
            />
          </SumTable>
        </div>
        <div class="pt-4 flex justify-end">
          <Button type="submit" disabled={!isValid}>
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}
