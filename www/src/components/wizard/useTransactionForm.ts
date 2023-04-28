import { useSignal } from "@preact/signals"
import { defaultAccount } from "../../signals/accounts.js"
import type { TransactionData } from "./schemas.js"

const initialValues: TransactionData = {
  from: defaultAccount.peek(),
  to: "",
  amount: 0,
}

export function useTransactionForm() {
  const formData = useSignal(initialValues)

  const updateFormData = (formDataNew: Partial<TransactionData>) => {
    formData.value = { ...formData.value, ...formDataNew }
  }

  return {
    updateFormData,
    formData,
  }
}
