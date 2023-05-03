import { MultiAddress, westend } from "@capi/westend"
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { signal } from "@preact/signals"
import { hex, ss58 } from "capi"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../../signals/index.js"
import { AccountId } from "../../AccountId.js"
import { AccountSelect } from "../../AccountSelect.js"
import { AddressInput } from "../../AddressInput.js"
import { Button } from "../../Button.js"
import { Input } from "../../Input.js"
import { Table } from "../../Table.js"
import { goNext } from "../Wizard.js"
import {
  formData,
  TransactionData,
  transactionSchema,
  updateFormData,
} from "./formData.js"

const selectedAccount = signal(defaultAccount.value)

export function TransactionNew() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
  })

  const subscription = watch(async ({ amount, to }) => {
    if (isValid && amount && to) {
      const addressPubKey = ss58.decode(to)[1]
      const call = westend.Balances
        .transferKeepAlive({
          value: BigInt(amount),
          dest: MultiAddress.Id(addressPubKey),
        })
      const callHash = hex.encode(await call.callHash.run())
      const callData = hex.encode(await call.callData.run())

      updateFormData({
        ...formData,
        callHash,
        callData,
      })
    }
  })

  const onSubmit: SubmitHandler<TransactionData> = async (formDataNew) => {
    updateFormData({ ...formDataNew })
    subscription.unsubscribe()
    goNext()
  }
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
            <AccountId account={selectedAccount.value} />
          </div>
          <div className="space-y-2">
            <Controller
              control={control}
              name="amount"
              defaultValue={0}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Send"
                  required
                  error={errors.amount?.message}
                  type="number"
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
              defaultValue={selectedAccount.value}
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
          <Table unit="DOT">
            <Table.Item name="Send" fee={0} />
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
