import { Signal, signal } from "@preact/signals"
import { z } from "zod"
import { defaultAccount } from "../../../signals/accounts.js"
import { isValidAddress } from "../../../util/address.js"

export const transactionSchema = z.object({
  amount: z.number({
    required_error: "Amount is required",
  }).min(1),
  from: z.object({
    address: z.string(),
    name: z.string().optional(),
    source: z.string(),
  }).optional().refine((a) => isValidAddress(a?.address), {
    message: "Invalid address",
  }),
  to: z.string().refine((value) => isValidAddress(value), {
    message:
      "Provided address is invalid. Please insure you have typed correctly.",
  }),
  callHash: z.string().optional(),
  callData: z.string().optional(),
})

export type TransactionData = z.infer<typeof transactionSchema>

const initialValues = {
  from: defaultAccount.peek(),
  to: "",
  amount: 0,
}

export const formData: Signal<TransactionData> = signal(initialValues)

export const updateFormData = (formDataNew: Partial<TransactionData>) => {
  formData.value = { ...formData.value, ...formDataNew }
}
