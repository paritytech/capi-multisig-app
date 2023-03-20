import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { useForm } from "react-hook-form"
import { Button } from "../Button.js"
import { MultisigMemberEntity, multisigMemberSchema } from "./schemas.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

export function MultisigMembers() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<MultisigMemberEntity>({
    resolver: zodResolver(multisigMemberSchema),
    mode: "onChange",
  })
  const { goNext, goPrev } = useWizardNavigation()
  const { formData, updateFormData } = useWizardFormData()

  const onSubmit = (formDataNew: MultisigMemberEntity) => {
    updateFormData(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: MultisigMemberEntity) => {
    updateFormData(formDataNew)
    goPrev()
  }

  const onErrorBack = () => {
    const formDataWithErrors = getValues()
    updateFormData(formDataWithErrors)
    goPrev()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">2. Members</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Members: <span class="text-pink-600">*</span>
      </label>

      {formData.members.map((member, i) => {
        return (
          <>
            <input
              {...register(`members.${i}`)}
              defaultValue={member}
              placeholder="Enter the address..."
              class="block w-full rounded-lg border border-gray-300 p-2 my-2"
            />
            {errors.members && (
              <div class="field-error">
                {errors.members[i]?.message}
              </div>
            )}
          </>
        )
      })}

      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack, onErrorBack)}>
          &lt; Back
        </Button>
        <Button type="submit">Sign & create</Button>
      </div>
    </form>
  )
}
