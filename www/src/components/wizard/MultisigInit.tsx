import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import { IconChevronRight } from "../icons/IconChevronRight.js"
import { Input } from "../Input.js"
import { InputNumber } from "../InputNumber.js"
import { MultisigInitEntity, multisigInitSchema } from "./schemas.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

export function MultisigInit() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MultisigInitEntity>({
    resolver: zodResolver(multisigInitSchema),
    mode: "onChange",
  })
  const { goNext } = useWizardNavigation()
  const {
    formData: { value: { members, name, memberCount, threshold } },
    updateFormData,
  } = useWizardFormData()

  const onSubmit = (formDataNew: MultisigInitEntity) => {
    if (!members) return
    const initialAccounts = accounts.peek()
    const newMembers = Array.from(
      { length: formDataNew.memberCount },
      (_, i) => members[i] ?? initialAccounts[i],
    )
    updateFormData({ ...formDataNew, members: newMembers })
    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">1. Multisig setup</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <Controller
        control={control}
        name="name"
        defaultValue={name}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Enter the name..."
            className="w-64"
            error={errors.name && errors.name.message}
            label="Multisig name"
            required
          />
        )}
      />
      <label>Creator</label>
      <div class="mb-4">
        {`${defaultAccount.value?.name}  ${defaultAccount.value?.address}`}
      </div>
      <div class="flex gap-8 justify-start">
        <Controller
          control={control}
          name="memberCount"
          defaultValue={memberCount}
          render={({ field }) => (
            <InputNumber
              {...field}
              label="Members"
              required
              error={errors.memberCount && errors.memberCount.message}
            />
          )}
        />
        <Controller
          control={control}
          name="threshold"
          defaultValue={threshold}
          rules={{ validate: (t) => t < memberCount }}
          render={({ field }) => (
            <InputNumber
              {...field}
              label="Threshold"
              required
              error={errors.threshold && errors.threshold.message}
            />
          )}
        />
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
