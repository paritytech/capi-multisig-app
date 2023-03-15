import * as z from "zod"

export const multisigInitSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name for the multisig setup",
  }),
  members: z.number().gt(1, {
    message: "A multisig should have minimum 2 members",
  }),
  treshold: z.number().gt(
    1,
    "The minimum supported treshold is 2",
  ),
}).refine(
  (data) => data.members >= data.treshold,
  {
    path: ["treshold"],
    message:
      "The threshold should should not be greater than the number of members",
  },
).refine(
  (data) => data.members >= data.treshold,
  {
    path: ["members"],
    message:
      "The number of members should should not be lesser than the threshold",
  },
)

export type MultisigInitEntity = z.infer<typeof multisigInitSchema>
