import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"
import { getMultisigAddress } from "../../../api/getMultisigAddress.js"
import {
  createStashCall,
  ReplaceDelegateCallNotification,
  replaceDelegatesCall,
} from "../../../api/index.js"
import {
  accounts,
  defaultAccount,
  defaultSender,
} from "../../../signals/accounts.js"
import { formatBalance } from "../../../util/balance.js"
import {
  PROXY_DEPOSIT_BASE,
  PROXY_DEPOSIT_FACTOR,
} from "../../../util/chain-constants.js"
import { handleException } from "../../../util/events.js"
import { storeSetup } from "../../../util/local-storage.js"
import { AccountSelect } from "../../AccountSelect.js"
import { Button } from "../../Button.js"
import { IconChevronLeft } from "../../icons/IconChevronLeft.js"
import { InputError } from "../../InputError.js"
import { useNotifications } from "../../Notifications.js"
import { Row, SumTable } from "../../SumTable.js"
import { goNext, goPrev } from "../Wizard.js"
import {
  MultisigMemberEntity,
  multisigMemberSchema,
  updateWizardData,
  wizardData,
} from "./wizardData.js"
const { addNotification, closeNotification } = useNotifications()

const multisigCreationFees: Row[] = [
  {
    name: "Proxy fee",
    value: formatBalance(PROXY_DEPOSIT_BASE + PROXY_DEPOSIT_FACTOR),
    info:
      "Amount reserved for the creation of a PureProxy that holds the multisig funds. The multisig account acts as AnyProxy for this account.",
  },
]

const notifiacationsCb = (msg: ReplaceDelegateCallNotification) => {
  if (msg.type === "loading") {
    addNotification({
      id: "",
      message: "Processing...",
      type: "loading",
    })
    return
  }
  if (msg.type === "success") {
    closeNotification("")
    addNotification({ id: uuid(), message: "InBlock", type: "success" })
    return
  }
  addNotification({ id: uuid(), message: msg.events, type: "info" })
}

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

      const stashAddress = await createStashCall(
        defaultAccount.value!,
        notifiacationsCb,
      )

      console.info("New Stash created at:", stashAddress)

      const multisigAddress = await getMultisigAddress(
        members.map((member) => member!.address),
        threshold,
      )

      await replaceDelegatesCall(
        stashAddress,
        defaultAccount.value,
        multisigAddress,
        notifiacationsCb,
      )

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
      handleException(exception)
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
