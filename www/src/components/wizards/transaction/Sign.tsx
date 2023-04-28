import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../../Button.js"
import { goNext } from "../Wizard.js"
import {
  formData,
  TransactionData,
  transactionSchema,
  updateFormData,
} from "./formData.js"

export function TransactionSign() {
  const {
    handleSubmit,
    formState: { isValid },
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
  })

  const { value: { from, to, amount } } = formData

  const onSubmit: SubmitHandler<TransactionData> = (formDataNew) => {
    updateFormData({ ...formDataNew })
    goNext()
  }
  return (
    <div className="flex flex-col gap-6 divide-y divide-divider">
      <h2 className="text-black text-xl ">Sign transaction</h2>
      <div>From: {from?.name}</div>
      <div>To: {to}</div>
      <div>Amount: {amount}</div>
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
