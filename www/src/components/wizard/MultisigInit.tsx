import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import { MultisigInitEntity, multisigInitSchema } from "./schemas.js"
import type { FormData } from "./schemas.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

export function MultisigInit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MultisigInitEntity>({
    resolver: zodResolver(multisigInitSchema),
    mode: "onChange",
  })
  const { goNext } = useWizardNavigation()
  const { formData, updateFormData } = useWizardFormData()

  const onSubmit = (formDataNew: MultisigInitEntity) => {
    const members = setMembers(formDataNew, formData)
    updateFormData({ ...formDataNew, members })
    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">1. Multisig setup</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Multisig Name <span class="text-pink-600">*</span>
      </label>
      <input
        {...register("name")}
        id="name"
        defaultValue={formData.name}
        placeholder="Enter the name..."
        class="block rounded-lg border border-gray-300 p-2 mt-2 mb-4 w-1/2"
      />
      {errors.name && (
        <div class="field-error">
          {errors.name.message}
        </div>
      )}
      <label class="leading-6">
        Creator
      </label>
      <div className="mb-4">
        {`${defaultAccount.value?.name}  ${defaultAccount.value?.address}`}
      </div>
      <div className="flex">
        <div>
          <label class="leading-6">
            Members
          </label>
          <input
            {...register("memberCount", { valueAsNumber: true })}
            id="members"
            type="number"
            min={0}
            defaultValue={formData.memberCount.toString()}
            class="block rounded-lg border border-gray-300 p-2 mt-2 mb-4 w-1/2"
          />
          {errors.memberCount && (
            <div class="field-error">
              {errors.memberCount.message}
            </div>
          )}
        </div>
        <div>
          <label class="leading-6">
            Threshold
          </label>
          <input
            {...register("threshold", {
              valueAsNumber: true,
              validate: (t) => t < formData.memberCount,
            })}
            id="threshold"
            type="number"
            min={0}
            defaultValue={formData.threshold.toString()}
            class="block rounded-lg border border-gray-300 p-2 mt-2 mb-4 w-1/2"
          />
          {errors.threshold && (
            <div class="field-error">
              {errors.threshold.message}
            </div>
          )}
        </div>
      </div>

      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-end">
        <Button variant="ghost" type="submit">
          Next &gt;
        </Button>
      </div>
    </form>
  )
}

function setMembers(formDataNew: MultisigInitEntity, formData: FormData) {
  const isMembersNotInitialized = formData.members.length === 0
  const isMemberCountChanged = formDataNew.memberCount !== formData.memberCount
  const isMemberCountDecreased = formDataNew.memberCount < formData.memberCount
  const isMemberCountIncreased = formDataNew.memberCount > formData.memberCount

  if (isMembersNotInitialized) {
    const membersFromAccount = accounts.value.slice(0, formDataNew.memberCount)
      .map((account) => account.address)

    const isAccountLessThanMembers =
      membersFromAccount.length < formDataNew.memberCount

    if (isAccountLessThanMembers) {
      return [
        ...membersFromAccount,
        ...Array(formDataNew.memberCount - membersFromAccount.length),
      ]
    }

    return membersFromAccount
  }

  if (isMemberCountChanged) {
    if (isMemberCountDecreased) {
      return formData.members.slice(0, formDataNew.memberCount)
    }

    if (isMemberCountIncreased) {
      return [
        ...formData.members,
        ...Array(formDataNew.memberCount - formData.members.length),
      ]
    }
  }

  return formData.members
}
