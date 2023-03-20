import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import { NumberInput } from "../NumberInput.js"
import { MultisigInitEntity, multisigInitSchema } from "./schemas.js"
import type { FormData } from "./schemas.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

export function MultisigInit() {
  const {
    register,
    handleSubmit,
    control,
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
      <label>
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
      <label>
        Creator
      </label>
      <div class="mb-4">
        {`${defaultAccount.value?.name}  ${defaultAccount.value?.address}`}
      </div>
      <div class="flex">
        <div class="mr-8">
          <label class="block leading-6 mb-2">
            Members:<span class="text-pink-600">*</span>
          </label>
          <Controller
            control={control}
            name="memberCount"
            defaultValue={formData.memberCount}
            render={({ field }) => <NumberInput {...field} />}
          />
          {errors.memberCount && (
            <div class="field-error w-36">
              {errors.memberCount.message}
            </div>
          )}
        </div>
        <div>
          <label class="block leading-6 mb-2 ">
            Threshold:<span class="text-pink-600">*</span>
          </label>
          <Controller
            control={control}
            name="threshold"
            defaultValue={formData.threshold}
            rules={{ validate: (t) => t < formData.memberCount }}
            render={({ field }) => <NumberInput {...field} />}
          />

          {errors.threshold && (
            <div class="field-error w-36">
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
      const offsetArray = Array(
        formDataNew.memberCount - membersFromAccount.length,
      )
      return [...membersFromAccount, ...offsetArray]
    }

    return membersFromAccount
  }

  if (isMemberCountChanged) {
    if (isMemberCountDecreased) {
      return formData.members.slice(0, formDataNew.memberCount)
    }

    if (isMemberCountIncreased) {
      const offsetArray = Array(
        formDataNew.memberCount - formData.members.length,
      )
      return [...formData.members, ...offsetArray]
    }
  }

  return formData.members
}
