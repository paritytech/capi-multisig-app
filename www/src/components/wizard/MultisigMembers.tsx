import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { accounts } from "../../signals/accounts.js"
import { formatBalance } from "../../util/balance.js"
import {
  existentialDeposit,
  proxyDepositBase,
  proxyDepositFactor,
} from "../../util/chain-constants.js"
import { AccountSelect } from "../AccountSelect.js"
import { Button } from "../Button.js"
import { IconChevronLeft } from "../icons/IconChevronLeft.js"
import { InputError } from "../InputError.js"
import { MultisigMemberEntity, multisigMemberSchema } from "./schemas.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

export function MultisigMembers() {
  const {
    handleSubmit,
    getValues,
    control,
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
      <h1 className="text-xl leading-8">2. Members</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />

      {formData.value.members.map((member, i) => {
        return (
          <div className="mb-3">
            <label className="leading-6 mb-2 block">
              Member {i + 1}
            </label>
            <Controller
              control={control}
              name={`members.${i}`}
              defaultValue={member}
              render={({ field }) => (
                <AccountSelect
                  {...field}
                  accounts={accounts.value}
                />
              )}
            />

            {errors.members && <InputError msg={errors.members[i]?.message} />}
          </div>
        )
      })}
      {errors.members && <InputError msg={errors.members.message} />}
      <div className="">
        <div className="flex justify-between">
          <div>Existential deposit Vault</div>
          <div>{formatBalance(existentialDeposit)}</div>
        </div>
        <div className="flex justify-between">
          <div>Existential deposit Multisig</div>
          <div>{formatBalance(existentialDeposit)}</div>
        </div>
        <div className="flex justify-between">
          <div>Proxy fee</div>
          <div>{formatBalance(proxyDepositBase + proxyDepositFactor)}</div>
        </div>
      </div>
      <hr className="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={handleSubmit(onBack, onErrorBack)}
          iconLeft={<IconChevronLeft />}
        >
          Back
        </Button>
        <Button type="submit">Sign & create</Button>
      </div>
    </form>
  )
}
