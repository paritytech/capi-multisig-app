import type { WalletAccount } from "@talisman-connect/wallets"
import { useCallback } from "preact/hooks"
import { z } from "zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { AccountSelect } from "../components/AccountSelect.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { Page } from "./templates/base.js"
import { accounts, defaultAccount } from '../signals/index.js'
import { useSignal } from "@preact/signals"
import { isValidAddress } from "../util/isValidAddress.js";
import { AddressInput } from "../components/AddressInput.js";
import { Button } from "../components/Button.js";

export const newTransactionSchema = z.object({
  amount: z.number({ required_error: "Amount is required", invalid_type_error: "Amount must be provided", }),
  to: z.string().refine((value) => isValidAddress(value), {
    message: "Provided address is invalid. Please insure you have typed correctly.",
  })
})
export type NewTransaction = z.infer<typeof newTransactionSchema>

export function NewTransaction() {
  const selectedAccount = useSignal(defaultAccount.value);

  const setSelectedAccount = useCallback((account: WalletAccount) => {
    selectedAccount.value = account
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<NewTransaction>({
    resolver: zodResolver(newTransactionSchema),
  });

  const onSubmit: SubmitHandler<NewTransaction> = (data) => console.log(data);

  return (
    <Page>
      <CenteredCard>
        <form class="flex flex-col gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2>New transaction</h2>
          <p>Initiated by:</p>
          <p>TODO</p>
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
          <p>From:</p>
          <AccountSelect
            selectedAccount={selectedAccount.value}
            setSelectedAccount={setSelectedAccount}
            accounts={accounts.value}
          />
          <p>To:</p>
          <Controller
            control={control}
            name="to"
            rules={{ required: true }}
            render={({
              field
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
          <Button type="submit" disabled={!isValid}>
            Create
          </Button>
        </form>
      </CenteredCard>
    </Page>
  )
}
