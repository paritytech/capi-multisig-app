import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { fundStash } from "../../../api/fundStash.js"
import { notificationsCb } from "../../../api/notificationsCb.js"
import { handleException } from "../../../util/events.js"
import { BalanceInput } from "../../BalanceInput.js"
import { Button } from "../../Button.js"
import { goNext } from "../Wizard.js"
import {
  MultisigFundEntity,
  multisigFundSchema,
  updateWizardData,
  wizardData,
} from "./wizardData.js"

export function MultisigFund() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MultisigFundEntity>({
    resolver: zodResolver(multisigFundSchema),
    mode: "onChange",
  })
  const { value: { fundingAmount, stash } } = wizardData

  const onSubmit = async (formDataNew: MultisigFundEntity) => {
    try {
      const { fundingAmount } = formDataNew
      if (!stash) return
      await fundStash(fundingAmount, stash, notificationsCb)
      updateWizardData({ ...formDataNew })
      goNext()
    } catch (exception: any) {
      handleException(exception)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl leading-8">3. Fund the multisig</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <Controller
        control={control}
        name="fundingAmount"
        defaultValue={fundingAmount}
        render={({ field }) => (
          <BalanceInput
            {...field}
            placeholder="0 WND"
            className="w-48"
            error={errors.fundingAmount?.message}
            label="Fund the Multisig"
          />
        )}
      />
      <hr className="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div className="flex flex-row gap-4 justify-end">
        <Button variant="secondary" disabled={isSubmitting} onClick={goNext}>
          Fund later
        </Button>

        <Button type="submit" variant="primary" disabled={isSubmitting}>
          Sign &amp; fund
        </Button>
      </div>
    </form>
  )
}
