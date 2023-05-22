import { AccountInfo, MultiAddress, Westend, westend } from "@capi/westend"
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Rune, ss58 } from "capi"
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
  EXISTENTIAL_DEPOSIT,
  PROXY_DEPOSIT_BASE,
  PROXY_DEPOSIT_FACTOR,
} from "../../../util/chain-constants.js"
import { storeSetup } from "../../../util/local-storage.js"
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
    value: EXISTENTIAL_DEPOSIT,
    displayValue: `${formatBalance(EXISTENTIAL_DEPOSIT)} WND`,
    info: "Amount to pay in order to keep the account alive",
  },
  {
    name: "Existential deposit Multisig",
    value: EXISTENTIAL_DEPOSIT,
    displayValue: `${formatBalance(EXISTENTIAL_DEPOSIT)} WND`,
    info: "Amount to pay in order to keep the account alive",
  },
  {
    name: "Proxy fee",
    value: PROXY_DEPOSIT_BASE + PROXY_DEPOSIT_FACTOR,
    displayValue: `${
      formatBalance(PROXY_DEPOSIT_BASE + PROXY_DEPOSIT_FACTOR)
    } WND`,
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
    updateFormData(formDataNew)
    goPrev()
  }

  const onErrorBack = () => {
    const formDataWithErrors = getValues()
    updateFormData(formDataWithErrors)
    goPrev()
  }

  const onSubmit = async (formDataNew: MultisigMemberEntity) => {
    const { signer } = defaultExtension.value || {}
    const { address: userAddress } = defaultAccount.value || {}
    if (!signer || !userAddress) {
      console.error(
        "No Signer available, make sure wallet is connected and a valid address is selected",
      )
      return
    }
    const userSender = pjsSender(westend, signer)(userAddress)

    const { threshold } = formData.value
    const { members } = formDataNew

    const signatories = members.map((member) => {
      const [_, addr] = ss58.decode(member?.address!)
      return addr
    })

    const multisig: MultisigRune<Westend, never> = MultisigRune.from(westend, {
      signatories,
      threshold,
    })

    const multisigAddress = ss58.encode(
      await westend.addressPrefix().run(),
      await multisig.accountId.run(),
    )

    const multisigInfo: AccountInfo = await westend.System.Account.value(
      multisig.accountId,
    ).run()
    // `multisigInfo` is undefined for blank accounts
    const multisigExists = !!multisigInfo
    if (multisigExists) {
      // TODO not sure what happens if account value falls
      // below existential deposit, can this even happen?

      console.info(
        `Multisig ${multisigAddress} is already funded, skipping existential funding.`,
      )
    } else {
      const existentialDepositMultisigCall = multisig
        .fund(EXISTENTIAL_DEPOSIT)
        .signed(signature({ sender: userSender }))
        .sent()
        .dbgStatus("Funding Multisig Account:")
        .finalized()

      await existentialDepositMultisigCall.run()
    }

    // TODO can we check if stash already created? previously?
    const createStashCall = westend.Proxy.createPure({
      proxyType: "Any",
      delay: 0,
      index: 0,
    })
      .signed(signature({ sender: userSender }))
      .sent()
      .dbgStatus("Creating Pure Proxy:")
      .finalizedEvents()
      .unhandleFailed()
      .pipe(filterPureCreatedEvents)
      // TODO typing is broken of capi
      .map((events: { pure: unknown }[]) => events.map(({ pure }) => pure))
      .access(0)

    const stashBytes = await createStashCall.run()
    const stashAddress = ss58.encode(
      await westend.addressPrefix().run(),
      stashBytes,
    )
    console.info("New Stash created at:", stashAddress)

    const [_, userAddressBytes] = ss58.decode(userAddress)
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
      .signed(signature({ sender: userSender }))
      .sent()
      .dbgStatus("Replacing Proxy Delegates:")
      .finalized()

    await replaceDelegates.run()

    // TODO save to database instead of localStorage
    storeSetup(members.map((m) => m?.address) as string[], {
      type: "setup",
      id: multisigAddress,
      genesisHash: "0x0",
      name: formData.value.name,
      members: members.map((member) => [member!.address, ""]),
      threshold: threshold,
      multisig: multisigAddress,
      stash: stashAddress,
      history: [],
    })

    updateFormData({
      ...formDataNew,
      address: multisigAddress,
      stash: stashAddress,
    })

    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl leading-8">2. Members</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />

      {formData.value.members.map((member, i) => {
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
      <FeesTable fees={multisigCreationFees} />
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
