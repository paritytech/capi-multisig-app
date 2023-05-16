import { MultiAddress, Westend, westend } from "@capi/westend"
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { ss58 } from "capi"
import { pjsSender } from "capi/patterns/compat/pjs_sender"
import { MultisigRune } from "capi/patterns/multisig"
import {
  filterPureCreatedEvents,
  replaceDelegateCalls,
} from "capi/patterns/proxy"
import { signature } from "capi/patterns/signature/polkadot"
import { Controller, useForm } from "react-hook-form"
import {
  accounts,
  defaultAccount,
  defaultExtension,
} from "../../../signals/accounts.js"
import { formatBalance } from "../../../util/balance.js"
import {
  existentialDeposit,
  proxyDepositBase,
  proxyDepositFactor,
} from "../../../util/chain-constants.js"
import { AccountSelect } from "../../AccountSelect.js"
import { Button } from "../../Button.js"
import { Fee, FeesTable } from "../../FeesTable.js"
import { IconChevronLeft } from "../../icons/IconChevronLeft.js"
import { InputError } from "../../InputError.js"
import { goNext, goPrev } from "../Wizard.js"
import {
  formData,
  MultisigMemberEntity,
  multisigMemberSchema,
  updateFormData,
} from "./formData.js"

const multisigCreationFees: Fee[] = [
  {
    name: "Existential deposit PureProxy",
    value: existentialDeposit,
    displayValue: `${formatBalance(existentialDeposit)} WND`,
    info: "Amount to pay in order to keep the account alive",
  },
  {
    name: "Existential deposit Multisig",
    value: existentialDeposit,
    displayValue: `${formatBalance(existentialDeposit)} WND`,
    info: "Amount to pay in order to keep the account alive",
  },
  {
    name: "Proxy fee",
    value: proxyDepositBase + proxyDepositFactor,
    displayValue: `${formatBalance(proxyDepositBase + proxyDepositFactor)} WND`,
    info:
      "Amount reserved for the creation of a PureProxy that holds the multisig funds. The multisig account acts as AnyProxy for this account.",
  },
]
// TODO copied from new-transaction.tsx
const sender = pjsSender(westend, defaultExtension.value?.signer)

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
    <form
      onSubmit={handleSubmit(async (formDataNew: MultisigMemberEntity) => {
        const { threshold } = formData.value
        const { members } = formDataNew

        const signatories = members.map((member) => {
          const [_, addr] = ss58.decode(member?.address!)
          return addr
        })

        const multisig: MultisigRune<Westend, never> = MultisigRune.from(
          westend,
          {
            signatories,
            threshold,
          },
        )
        const multisigAddress = ss58.encode(
          await westend.addressPrefix().run(),
          await multisig.accountId.run(),
        )
        console.log({ multisigAddress })
        const defaultSender = sender(defaultAccount.value!.address)

        const existentialDepositMultisig = multisig
          .fund(existentialDeposit)
          .signed(signature({ sender: defaultSender }))
          .sent()
          .dbgStatus("Funding Multisig:")
          .transactionStatuses((txStatus: any) => {
            console.log("txStatus", txStatus)
            // TODO handle form state here
            return false
          })

        const createPureProxy = westend.Proxy.createPure({
          proxyType: "Any",
          delay: 0,
          index: 0,
        }).signed(signature({ sender: defaultSender }))
          .sent()
          .dbgStatus("Create Stash:")
          .finalizedEvents()
          .unhandleFailed()
          .pipe(filterPureCreatedEvents)
          // TODO typing is broken of capi
          .map((events: { pure: unknown }[]) => events.map(({ pure }) => pure))
          .access(0)

        await existentialDepositMultisig.run()
        const stash = await createPureProxy.run()

        const depositToPureProxy = westend.Balances
          .transfer({
            value: 1_000_000_000_000n,
            dest: MultiAddress.Id(stash),
          })
          .signed(signature({ sender: defaultSender }))
          .sent()
          .dbgStatus("Transfer:")
          .finalized()

        // await depositToPureProxy.run()

        // const replaceDelegates = westend.Utility.batchAll({
        //   calls: Rune.array(replaceDelegateCalls(
        //     westend,
        //     MultiAddress.Id(stash),
        //     defaultAccount.address,
        //     multisig.address,
        //   )),
        // }).signed(signature({ sender: alexa }))
        //   .sent()
        //   .dbgStatus("Ownership swaps:")
        //   .finalized()

        // await replaceDelegates.run()

        // updateFormData(formDataNew)
        // goNext()
      })}
    >
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
