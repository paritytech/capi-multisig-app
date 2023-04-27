import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { useSignal } from "@preact/signals"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { AccountSelect } from "../components/AccountSelect.js"
import { AddressInput } from "../components/AddressInput.js"
import { Button } from "../components/Button.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { Identicon } from "../components/identicon/Identicon.js"
import { Table } from "../components/Table.js"
import { accounts, defaultAccount } from "../signals/index.js"
import { isValidAddress } from "../util/address.js"
import { Page } from "./templates/base.js"

export const newTransactionSchema = z.object({
  amount: z.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be provided",
  }),
  to: z.string().refine((value) => isValidAddress(value), {
    message:
      "Provided address is invalid. Please insure you have typed correctly.",
  }),
})
export type NewTransaction = z.infer<typeof newTransactionSchema>

export function NewTransaction() {
  const selectedAccount = useSignal(defaultAccount.value)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<NewTransaction>({
    resolver: zodResolver(newTransactionSchema),
  })

  const onSubmit: SubmitHandler<NewTransaction> = (data) => console.log(data)

  return (
    <Page>
      <CenteredCard>
        <div className="flex flex-col gap-6 divide-y divide-divider">
          <h2 className="text-black text-xl ">New transaction</h2>
          <form
            class="flex flex-col gap-4 w-full divide-y divide-divider"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div class="flex flex-col gap-4">
              <div className="space-y-2">
                <p className="mt-4 text-[#321D47]">Initiated by:</p>
                <div className="flex gap-2">
                  <Identicon
                    value={selectedAccount.value?.address!}
                    size={24}
                  />
                  <span className="font-bold">
                    {selectedAccount.value?.name!}
                  </span>
                  <span className="">{selectedAccount.value?.address!}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p>Send</p>
                <input
                  {...register("amount", { valueAsNumber: true })}
                  type="number"
                  class="block rounded-lg border border-gray-300 p-2 my-2 w-1/3"
                />
                {errors.amount && (
                  <p className="text-xs text-red-500">
                    {errors.amount?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <p>From:</p>
                <AccountSelect
                  accounts={accounts.value}
                  value={defaultAccount.value}
                  onChange={(account) => {
                    selectedAccount.value = account
                  }}
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
      </CenteredCard>
    </Page>
  )
}
