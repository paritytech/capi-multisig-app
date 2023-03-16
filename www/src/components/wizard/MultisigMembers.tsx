import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { signal } from "@preact/signals"
import type { Signal } from "@preact/signals"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../Button.js"
import { useWizardFormDataStep, useWizardNavigation } from "./Wizard.js"

const isValidAddress = () => true // TODO: update when function added
export const multisigMemberSchema = z.object({
  member: z.string({}).refine(isValidAddress, {
    message: "Invalid address",
  }),
})
export type MultisigMemberEntity = z.infer<typeof multisigMemberSchema>

export function createDefaultMembers(): Signal<MultisigMemberEntity> {
  return signal({
    member: "",
  })
}

export function MultisigMembers() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MultisigMemberEntity>({
    resolver: zodResolver(multisigMemberSchema),
    mode: "onChange",
  })
  const { goNext, goPrev } = useWizardNavigation()
  const { formDataStep, updateFormDataStep } = useWizardFormDataStep<
    MultisigMemberEntity
  >()

  const onSubmit = (formDataNew: MultisigMemberEntity) => {
    updateFormDataStep(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: MultisigMemberEntity) => {
    updateFormDataStep(formDataNew)
    goPrev()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">2. Members</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Member: <span class="text-pink-600">*</span>
      </label>
      <input
        {...register("member")}
        defaultValue={formDataStep.member}
        placeholder="Enter the address..."
        class="block w-full rounded-lg border border-gray-300 p-2 my-2"
      />
      {errors.member && (
        <div class="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.member.message}
        </div>
      )}
      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack)}>
          &lt; Back
        </Button>
        <Button type="submit">Sign & create</Button>
      </div>
    </form>
  )
}
