import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import type { WalletAccount } from "@talisman-connect/wallets"
import { Controller, useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import { InputError } from "../InputError.js"
import { InputNumber } from "../InputNumber.js"
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
    const members = setMembers(
      formDataNew.memberCount,
      formData.memberCount,
      formData.members,
      accounts.value,
    )

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
      {errors.name && <InputError msg={errors.name.message} />}
      <label>
        Creator
      </label>
      <div class="mb-4">
        {`${defaultAccount.value?.name}  ${defaultAccount.value?.address}`}
      </div>
      <div class="flex gap-8">
        <div class="max-w-[138px]">
          <label class="block mb-2">
            Members:<span class="text-pink-600">*</span>
          </label>
          <Controller
            control={control}
            name="memberCount"
            defaultValue={formData.memberCount}
            render={({ field }) => <InputNumber {...field} />}
          />
          {errors.memberCount && (
            <InputError
              msg={errors.memberCount.message}
            />
          )}
        </div>
        <div class="max-w-[138px]">
          <label class="block mb-2">
            Threshold:<span class="text-pink-600">*</span>
          </label>
          <Controller
            control={control}
            name="threshold"
            defaultValue={formData.threshold}
            rules={{ validate: (t) => t < formData.memberCount }}
            render={({ field }) => <InputNumber {...field} />}
          />
          {errors.threshold && <InputError msg={errors.threshold.message} />}
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

function setMembers(
  newMemberCount: number,
  oldMemberCount: number,
  members: FormData["members"],
  accounts: WalletAccount[],
) {
  const isMembersNotInitialized = members.length === 0
  const isMemberCountChanged = newMemberCount !== oldMemberCount
  const isMemberCountDecreased = newMemberCount < oldMemberCount
  const isMemberCountIncreased = newMemberCount > oldMemberCount

  if (isMembersNotInitialized) {
    const membersFromAccount = accounts.slice(0, newMemberCount)
      .map((account) => account.address)

    const isAccountLessThanMembers = membersFromAccount.length < newMemberCount

    if (isAccountLessThanMembers) {
      const offsetArray = Array(
        newMemberCount - membersFromAccount.length,
      )
      return [...membersFromAccount, ...offsetArray]
    }

    return membersFromAccount
  }

  if (isMemberCountChanged) {
    if (isMemberCountDecreased) {
      return members.slice(0, newMemberCount)
    }

    if (isMemberCountIncreased) {
      const offsetArray = Array(
        newMemberCount - members.length,
      )
      return [...members, ...offsetArray]
    }
  }

  return members
}
