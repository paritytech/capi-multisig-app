import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { WalletAccount } from "@talisman-connect/wallets"
import { Controller, useForm } from "react-hook-form"
import { PureProxyMultisig } from "../../multisig/create.js"
import { accounts, defaultAccount } from "../../signals/accounts.js"
import { formatBalance } from "../../util/balance.js"
import {
  existentialDeposit,
  proxyDepositBase,
  proxyDepositFactor,
} from "../../util/chain-constants.js"
import { AccountSelect } from "../AccountSelect.js"
import { Button } from "../Button.js"
import { Fee, FeesTable } from "../FeesTable.js"
import { IconChevronLeft } from "../icons/IconChevronLeft.js"
import { InputError } from "../InputError.js"
import { MultisigMemberEntity, multisigMemberSchema } from "./schemas.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

const multisigCreationFees: Fee[] = [
  {
    name: "Existential deposit PureProxy",
    value: existentialDeposit,
    displayValue: formatBalance(existentialDeposit),
    info: "Amount to pay in order to keep the account alive",
  },
  {
    name: "Existential deposit Multisig",
    value: existentialDeposit,
    displayValue: formatBalance(existentialDeposit),
    info: "Amount to pay in order to keep the account alive",
  },
  {
    name: "Proxy fee",
    value: proxyDepositBase + proxyDepositFactor,
    displayValue: formatBalance(proxyDepositBase + proxyDepositFactor),
    info:
      "Amount reserved for the creation of a PureProxy that holds the multisig funds. The multisig account acts as AnyProxy for this account.",
  },
]

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
  const { goPrev } = useWizardNavigation()
  const { formData, updateFormData } = useWizardFormData()

  const onSubmit = async (formDataNew: MultisigMemberEntity) => {
    updateFormData(formDataNew)
    const multi = new PureProxyMultisig(
      formDataNew.members as WalletAccount[],
      formData.peek().threshold,
      defaultAccount.peek()!,
    )
    console.log(multi)
    // await multi.createStash(defaultAccount.peek()?.address!)
    // goNext()
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
      <FeesTable fees={multisigCreationFees} />
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
