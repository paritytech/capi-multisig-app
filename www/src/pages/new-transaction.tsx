import type { WalletAccount } from "@talisman-connect/wallets"
import { useCallback } from "preact/hooks"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { AccountSelect } from "../components/AccountSelect.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { Page } from "./templates/base.js"
import { accounts, defaultAccount } from '../signals/index.js'
import { useSignal } from "@preact/signals"


export const newTransactionSchema = z.object({
  amount: z.number(),
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
    formState: { errors },
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
            <p className="text-xs italic text-red-500 mt-2">
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
          <button
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Start
          </button>
        </form>
      </CenteredCard>
    </Page>
  )
}
