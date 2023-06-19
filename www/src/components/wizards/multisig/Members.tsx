import { MultiAddress, Westend, westend } from "@capi/westend"
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Rune, ss58 } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import { signature } from "capi/patterns/signature/polkadot"
import {
  filterPureCreatedEvents,
  replaceDelegateCalls,
} from "capi/patterns/unstable/proxy"
import { Controller, useForm } from "react-hook-form"
import {
  accounts,
  defaultAccount,
  defaultSender,
} from "../../../signals/accounts.js"
import { formatBalance } from "../../../util/balance.js"
import { toPubKey } from "../../../util/capi-helpers.js"
import {
  PROXY_DEPOSIT_BASE,
  PROXY_DEPOSIT_FACTOR,
} from "../../../util/chain-constants.js"
import { storeSetup } from "../../../util/local-storage.js"
import { scope } from "../../../util/scope.js"
import { AccountSelect } from "../../AccountSelect.js"
import { Button } from "../../Button.js"
import { IconChevronLeft } from "../../icons/IconChevronLeft.js"
import { InputError } from "../../InputError.js"
import { Row, SumTable } from "../../SumTable.js"
import { goNext, goPrev } from "../Wizard.js"
import {
  MultisigMemberEntity,
  multisigMemberSchema,
  updateWizardData,
  wizardData,
} from "./wizardData.js"

const multisigCreationFees: Row[] = [
  {
    name: "Proxy fee",
    value: formatBalance(PROXY_DEPOSIT_BASE + PROXY_DEPOSIT_FACTOR),
    info:
      "Amount reserved for the creation of a PureProxy that holds the multisig funds. The multisig account acts as AnyProxy for this account.",
  },
]

export function MultisigMembers() {
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MultisigMemberEntity>({
    resolver: zodResolver(multisigMemberSchema),
    mode: "onChange",
  })

  const onBack = (formDataNew: MultisigMemberEntity) => {
    updateWizardData(formDataNew)
    goPrev()
  }

  const onErrorBack = () => {
    const formDataWithErrors = getValues()
    updateWizardData(formDataWithErrors)
    goPrev()
  }

  const onSubmit = async (formDataNew: MultisigMemberEntity) => {
    try {
      if (!defaultSender.value || !defaultAccount.value) return

      const { threshold } = wizardData.value
      const { members } = formDataNew

      const signatories = members.map((member) => toPubKey(member!.address))

      const multisig: MultisigRune<Westend, never> = MultisigRune.from(
        westend,
        {
          signatories,
          threshold,
        },
      )

      const multisigAddress = ss58.encode(
        await westend.addressPrefix().run(scope.value),
        await multisig.accountId.run(scope.value),
      )

      // TODO can we check if stash already created? previously?
      const createStashCall = westend.Proxy.createPure({
        proxyType: "Any",
        delay: 0,
        index: 0,
      })
        .signed(signature({ sender: defaultSender.value }))
        .sent()
        .dbgStatus("Creating Pure Proxy:")
        .finalizedEvents()
        .unhandleFailed()
        .pipe(filterPureCreatedEvents)
        // TODO typing is broken in capi
        .map((events: { pure: unknown }[]) => events.map(({ pure }) => pure))
        .access(0)

      const stashBytes = (await createStashCall.run(scope.value)) as Uint8Array
      const stashAddress = ss58.encode(
        await westend.addressPrefix().run(scope.value),
        stashBytes,
      )
      console.info("New Stash created at:", stashAddress)

      const [_, userAddressBytes] = ss58.decode(defaultAccount.value.address)
      // TODO can we somehow check if the delegation has already been done?
      const replaceDelegates = westend.Utility.batchAll({
        calls: Rune.array(
          replaceDelegateCalls(
            westend,
            MultiAddress.Id(stashBytes), // effected account
            MultiAddress.Id(userAddressBytes), // from
            multisig.address, // to
          ),
        ),
      })
        .signed(signature({ sender: defaultSender.value }))
        .sent()
        .dbgStatus("Replacing Proxy Delegates:")
        .finalized()

      await replaceDelegates.run(scope.value)

      // TODO save to database instead of localStorage
      storeSetup(members.map((m) => m?.address) as string[], {
        type: "setup",
        id: multisigAddress,
        genesisHash: "0x0",
        name: wizardData.value.name,
        members: members.map((member) => [member!.address, ""]),
        threshold: threshold,
        multisig: multisigAddress,
        stash: stashAddress,
        history: [],
      })

      updateWizardData({
        ...formDataNew,
        address: multisigAddress,
        stash: stashAddress,
      })

      goNext()
    } catch (exception) {
      console.error("Something went wrong:", exception)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl leading-8">2. Members</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />

      {wizardData.value.members.map((member, i) => {
        return (
          <div className="mb-3">
            <label className="leading-6 mb-2 block">Member {i + 1}</label>
            <Controller
              control={control}
              name={`members.${i}`}
              defaultValue={member}
              render={({ field }) => (
                <AccountSelect {...field} accounts={accounts.value} />
              )}
            />

            {errors.members && <InputError msg={errors.members[i]?.message} />}
          </div>
        )
      })}
      {errors.members && <InputError msg={errors.members.message} />}
      <SumTable unit="WND">
        {multisigCreationFees.map((fee) => <SumTable.Row {...fee} />)}
      </SumTable>
      <hr className="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={handleSubmit(onBack, onErrorBack)}
          iconLeft={<IconChevronLeft />}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Sign & create
        </Button>
      </div>
    </form>
  )
}
