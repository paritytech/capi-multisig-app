import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../Button.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

export const multisigMemberSchema = z.object({
  members: z.array(z.string()),
})
export type MultisigMemberEntity = z.infer<typeof multisigMemberSchema>

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
  const { formData, updateFormData } = useWizardFormData()

  // TODO: Fix members address validation (zod)
  const onSubmit = (formDataNew: MultisigMemberEntity) => {
    updateFormData(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: MultisigMemberEntity) => {
    updateFormData(formDataNew)
    goPrev()
  }

  // TODO: Implement on back when validation fails
  // const onBackError = () => {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">2. Members</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Members: <span class="text-pink-600">*</span>
      </label>

      {formData.members.map((member, index) => {
        return (
          <>
            <input
              {...register(`members.${index}`)}
              defaultValue={member}
              placeholder="Enter the address..."
              class="block w-full rounded-lg border border-gray-300 p-2 my-2"
            />
          </>
        )
      })}

      {errors.members && (
        <div class="field-error">
          {errors.members.message}
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
