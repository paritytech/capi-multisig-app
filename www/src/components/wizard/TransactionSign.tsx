import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { signal } from "@preact/signals"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../signals/index.js"
import { Button } from "../Button.js"
import { TransactionData, transactionSchema } from "./schemas.js"
import { useTransactionForm } from "./useTransactionForm.js"
import { useWizardNavigation } from "./Wizard.js"

const selectedAccount = signal(defaultAccount.value)

export function TransactionSign() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
  })

  const { goNext } = useWizardNavigation()
  const {
    formData: { value: { from } },
    updateFormData,
  } = useTransactionForm()

  const onSubmit: SubmitHandler<TransactionData> = (formDataNew) => {
    updateFormData({ ...formDataNew })
    goNext()
  }
  return (
    <div className="flex flex-col gap-6 divide-y divide-divider">
      <h2 className="text-black text-xl ">New transaction</h2>
      <form
        class="flex flex-col gap-4 w-full divide-y divide-divider"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div class="pt-4 flex justify-end">
          <Button type="submit" disabled={!isValid}>
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}
