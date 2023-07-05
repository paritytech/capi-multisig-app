import { Signal, signal } from "@preact/signals"

import { z } from "zod"
import { isValidAddress } from "../../../util/address.js"
import { MINIMUM_TRANSFER_AMOUNT } from "../../../util/chain-constants.js"

export type MultisigData =
  & MultisigInitEntity
  & MultisigMemberEntity
  & MultisigFundEntity

export const multisigInitSchema = z
  .object({
    name: z.string().min(1, "Please enter a name for the multisig setup"),
    address: z.string().optional(),
    stash: z.string().optional(),
    memberCount: z.number().gte(2, "The minimum is 2"),
    threshold: z.number().gte(2, "The minimum is 2"),
  })
  .refine((data) => data.memberCount >= data.threshold, {
    path: ["threshold"],
    message: "The threshold must be less or equal to the number of members",
  })
  .refine((data) => data.memberCount >= data.threshold, {
    path: ["members"],
    message: "The number of members must be greater than the threshold",
  })

export type MultisigInitEntity = z.infer<typeof multisigInitSchema>

export const multisigMemberSchema = z.object({
  members: z
    .array(
      z
        .object({
          address: z.string(),
          name: z.string().optional(),
          source: z.string(),
        })
        .optional()
        .refine((a) => isValidAddress(a?.address), {
          message: "Invalid address",
        }),
    )
    .superRefine((val, ctx) => {
      const addresses = val.map((a) => a?.address)
      if (addresses.length !== new Set(addresses).size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `No duplicates allowed, please choose a different account.`,
          fatal: true,
        })
      }
    }),
})

export type MultisigMemberEntity = z.infer<typeof multisigMemberSchema>

export const multisigFundSchema = z.object({
  fundingAmount: z
    .number()
    .min(MINIMUM_TRANSFER_AMOUNT, { message: "Fund must be greater than 0" }),
})

export type MultisigFundEntity = z.infer<typeof multisigFundSchema>

const initialValues = {
  name: "",
  memberCount: 2,
  threshold: 2,
  members: [],
  fundingAmount: 1,
}

export const wizardData: Signal<MultisigData> = signal(initialValues)

export const updateWizardData = (newWizardData: Partial<MultisigData>) => {
  wizardData.value = { ...wizardData.value, ...newWizardData }
}
export const resetWizardData = () => {
  wizardData.value = initialValues
}
