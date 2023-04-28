import { Signal, signal } from "@preact/signals"
import { defaultAccount } from "../../signals/accounts.js"
import type { TransactionData } from "./schemas.js"

const initialValues = {
  from: defaultAccount.peek(),
  to: "",
  amount: 0,
}
export const formData: Signal<TransactionData> = signal(initialValues)

export const updateFormData = (formDataNew: Partial<TransactionData>) => {
  formData.value = { ...formData.value, ...formDataNew }
}
