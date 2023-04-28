import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { Controller, useForm } from "react-hook-form"
import { Button } from "../Button.js"
import { IconChevronLeft } from "../icons/IconChevronLeft.js"
import { Input } from "../Input.js"
import { formData, updateFormData } from "./multisigFormData.js"
import { MultisigFundEntity, multisigFundSchema } from "./schemas.js"
import { useWizardNavigation } from "./Wizard.js"

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
  const { goNext, goPrev } = useWizardNavigation()
  const { value: { fund } } = formData

  const onSubmit = (formDataNew: MultisigFundEntity) => {
    updateFormData(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: MultisigFundEntity) => {
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
      <h1 className="text-xl leading-8">3. Fund the multisig</h1>
      <hr className="border-t border-gray-300 mt-6 mb-4" />
      <Controller
        control={control}
        name="fund"
        defaultValue={fund}
        render={({ field }) => (
          <Input
            {...field}
            placeholder="0 DOT"
            className="w-48"
            error={errors.fund?.message}
            label="Fund the Multisig"
            type="number"
          />
        )}
      />
      <hr className="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div className="flex justify-between">
        <Button
          variant="ghost"
          onClick={handleSubmit(onBack, onErrorBack)}
          iconLeft={<IconChevronLeft />}
        >
          Back
        </Button>
        <Button type="submit">Sign &amp; fund</Button>
      </div>
    </form>
  )
}
