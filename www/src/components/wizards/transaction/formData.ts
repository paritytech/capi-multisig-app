import { Signal, signal } from "@preact/signals"
import { Setup } from "common"
import { z } from "zod"
import { defaultAccount } from "../../../signals/accounts.js"
import { isValidAddress } from "../../../util/address.js"

export const formDataSchema = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
    })
    .min(0.0001),
  from: z
    .object({
      address: z.string(),
      name: z.string().optional(),
      source: z.string(),
    })
    .optional()
    .refine((a) => isValidAddress(a?.address), {
      message: "Invalid address",
    }),
  to: z.string().refine((value) => isValidAddress(value), {
    message:
      "Provided address is invalid. Please insure you have typed correctly.",
  }),
})

export type FormData = z.infer<typeof formDataSchema>

type ComputedFormData = {
  callHash?: string
  callData?: string
  setup?: Setup
}

export type TransactionData = FormData & ComputedFormData

const initialValues: FormData = {
  from: defaultAccount.peek(),
  to: "",
  amount: 0,
}

export const transactionData: Signal<TransactionData> = signal(initialValues)

export const updateTransactionData = (
  newTransactionData: Partial<TransactionData>,
) => {
  transactionData.value = { ...transactionData.value, ...newTransactionData }
}
