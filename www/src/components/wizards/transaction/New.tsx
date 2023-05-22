import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { hex } from "capi"
import { useEffect } from "preact/hooks"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { accounts } from "../../../signals/index.js"
import { formatBalance } from "../../../util/balance.js"
import { AccountId } from "../../AccountId.js"
import { AccountSelect } from "../../AccountSelect.js"
import { AddressInput } from "../../AddressInput.js"
import { BalanceInput } from "../../BalanceInput.js"
import { Button } from "../../Button.js"
import { Table } from "../../Table.js"
import { goNext } from "../Wizard.js"
import {
  formData,
  TransactionData,
  transactionSchema,
  updateFormData,
} from "./formData.js"
import { call, fee, selectedAccount } from "./signals.js"

export function TransactionNew() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<TransactionData> = async (formDataNew) => {
    if (!call.value) return
    const callHash = hex.encode(await call.value.callHash.run())
    const callData = hex.encode(await call.value.callData.run())
    updateFormData({ ...formDataNew, callHash, callData })
    goNext()
  }

  useEffect(() => {
    const subscription = watch((data) => {
      updateFormData(data as TransactionData)
    })
    return () => subscription.unsubscribe()
  }, [watch])

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
              defaultValue={formData.value.amount}
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
              defaultValue={formData.value.from}
              render={({ field }) => (
                <AccountSelect
                  {...field}
                  accounts={accounts.value}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <p>To:</p>
            <Controller
              control={control}
              defaultValue={formData.value.to}
              name="to"
              rules={{ required: true }}
              render={({
                field,
              }) => (
                <AddressInput
                  {...field}
                  placeholder="Address"
                />
              )}
            />
            {errors.to && (
              <p className="text-xs text-red-500">
                {errors.to?.message}
              </p>
            )}
          </div>
        </div>
        <div class="pt-4">
          <Table unit="WND">
            <Table.Item name="Send" fee={formData.value.amount} />
            <Table.Item name="Transaction Fee" fee={formatBalance(fee.value)} />
          </Table>
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
