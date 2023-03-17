import { ss58 } from "capi"
import { z } from "zod"

export type FormData =
  & MultisigInitEntity
  & MultisigMemberEntity
  & MultisigFundEntity

export const multisigInitSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name for the multisig setup",
  }),
  memberCount: z.number().gt(1, {
    message: "A multisig should have minimum 2 members",
  }),
  threshold: z.number().gt(
    1,
    "The minimum supported threshold is 2",
  ),
}).refine(
  (data) => data.memberCount >= data.threshold,
  {
    path: ["threshold"],
    message:
      "The threshold should should not be greater than the number of members",
  },
).refine(
  (data) => data.memberCount >= data.threshold,
  {
    path: ["members"],
    message:
      "The number of members should should not be lesser than the threshold",
  },
)

export type MultisigInitEntity = z.infer<typeof multisigInitSchema>

export const multisigMemberSchema = z.object({
  members: z.array(
    z.string({}).refine(isValidAddress, {
      message: "Invalid address",
    }),
  ),
})

export type MultisigMemberEntity = z.infer<typeof multisigMemberSchema>

export const multisigFundSchema = z.object({
  fund: z.number().min(1, { message: "Fund must be greater than 0" }),
})

export type MultisigFundEntity = z.infer<typeof multisigFundSchema>

// TODO: Remove when PR: feat(ui): Address Input #82 is merged
function isValidAddress(address: string) {
  try {
    return !!ss58.encode(...ss58.decode(address))
  } catch (_error) {
    return false
  }
}
