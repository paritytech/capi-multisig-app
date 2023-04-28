import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../../signals/accounts.js"
import { AccountId } from "../../AccountId.js"
import { Button } from "../../Button.js"
import { IconChevronRight } from "../../icons/IconChevronRight.js"
import { Input } from "../../Input.js"
import { InputNumber } from "../../InputNumber.js"
import { useWizardNavigation } from "../Wizard.js"
import {
  formData,
  MultisigInitEntity,
  multisigInitSchema,
  updateFormData,
} from "./formData.js"

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
  const { value: { members, name, memberCount, threshold } } = formData

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
      <h1 className="text-xl leading-8">1. Multisig setup</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <Controller
        control={control}
        name="name"
        defaultValue={name}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Enter the name..."
            className="w-64"
            error={errors.name?.message}
            label="Multisig name"
            required
          />
        )}
      />
      <label className="mb-2 inline-block">Creator</label>
      <div className="mb-4">
        <AccountId account={defaultAccount.value} />
      </div>
      <div className="flex gap-8 justify-start">
        <Controller
          control={control}
          name="memberCount"
          defaultValue={memberCount}
          render={({ field }) => (
            <InputNumber
              {...field}
              label="Members"
              required
              error={errors.memberCount?.message}
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
              error={errors.threshold?.message}
            />
          )}
        />
      </div>
      <hr className="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div className="flex justify-end">
        <Button variant="ghost" type="submit" iconRight={<IconChevronRight />}>
          Next
        </Button>
      </div>
    </form>
  )
}
