import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import { IconChevronRight } from "../icons/IconChevronRight.js"
import { InputError } from "../InputError.js"
import { InputNumber } from "../InputNumber.js"
import { MultisigInitEntity, multisigInitSchema } from "./schemas.js"
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
    const initialAccounts = accounts.peek()
    const members = Array.from(
      { length: formDataNew.memberCount },
      (_, i) => formData.value.members[i] ?? initialAccounts[i],
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
        defaultValue={formData.value.name}
        placeholder="Enter the name..."
        class="block rounded-lg border border-gray-300 p-2 mt-2 mb-4 w-1/2"
      />
      {errors.name && <InputError msg={errors.name.message} />}
      <label>Creator</label>
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
            defaultValue={formData.value.memberCount}
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
            defaultValue={formData.value.threshold}
            rules={{ validate: (t) => t < formData.value.memberCount }}
            render={({ field }) => <InputNumber {...field} />}
          />
          {errors.threshold && <InputError msg={errors.threshold.message} />}
        </div>
      </div>
      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-end">
        <Button variant="ghost" type="submit" iconRight={<IconChevronRight />}>
          Next
        </Button>
      </div>
    </form>
  )
}
