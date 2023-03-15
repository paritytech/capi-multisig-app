import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { signal } from "@preact/signals"
import type { Signal } from "@preact/signals"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { accounts } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import {
  useWizardFormDataStep,
  useWizardNavigation,
  wizardState,
} from "./Wizard.js"

export const multisigMemberSchema = z.object({
  members: z.array(z.string()),
})
export type MultisigMemberEntity = z.infer<typeof multisigMemberSchema>

export function createDefaultMembers(): Signal<MultisigMemberEntity> {
  return signal({
    members: [],
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
  const { updateFormDataStep } = useWizardFormDataStep<
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
  const memberCount = wizardState.formData.init.peek().memberCount
  const initialAccounts = accounts.peek().slice(0, memberCount)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">2. Members</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Members: <span class="text-pink-600">*</span>
      </label>
      {Array.from({ length: memberCount }, (_, i) => i).map((index) => {
        return (
          <>
            <input
              {...register(`members.${index}`)}
              defaultValue={initialAccounts[index]?.address}
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
