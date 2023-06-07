import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { BalanceInput } from "../../BalanceInput.js"
import { Button } from "../../Button.js"
import { IconChevronLeft } from "../../icons/IconChevronLeft.js"
import { goNext } from "../Wizard.js"
import {
  formData,
  MultisigFundEntity,
  multisigFundSchema,
  updateFormData,
} from "./formData.js"

export function MultisigFund() {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<MultisigFundEntity>({
    resolver: zodResolver(multisigFundSchema),
    mode: "onChange",
  })
  const { value: { fund } } = formData

  const onSubmit = (formDataNew: MultisigFundEntity) => {
    const { stash } = formData.value
    if (!stash) {
      console.error("No stash account found")
      return
    }
    // TODO needs to be implemented
    // const fundStashCall = westend.Balances
    //   .transfer({
    //     value: amount,
    //     dest: MultiAddress.Id(stash),
    //   })
    //   .signed(signature({ sender: userSender }))
    //   .sent()
    //   .dbgStatus("Transfer:")
    //   .finalized()

    // await fundStashCall.run()

    updateFormData(formDataNew)
    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl leading-8">3. Fund the multisig</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <Controller
        control={control}
        name="fund"
        defaultValue={fund}
        render={({ field }) => (
          <BalanceInput
            {...field}
            placeholder="0 DOT"
            className="w-48"
            error={errors.fund?.message}
            label="Fund the Multisig"
          />
        )}
      />
      <hr className="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div className="flex justify-between">
        <Link to="/">
          <Button
            variant="ghost"
            iconLeft={<IconChevronLeft />}
          >
            Fund later
          </Button>
        </Link>

        <Button type="submit">Sign &amp; fund</Button>
      </div>
    </form>
  )
}
