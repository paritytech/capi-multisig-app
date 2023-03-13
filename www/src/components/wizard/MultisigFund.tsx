import { zodResolver } from "@hookform/resolvers/zod/dist/index.js"
import { signal } from "@preact/signals"
import type { Signal } from "@preact/signals"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../Button.js"
import { useWizardFormDataStep, useWizardNavigation } from "./Wizard.js"

export const multisigFundSchema = z.object({
  fund: z.number().min(1, { message: "Fund must be greater than 0" }),
})
export type MultisigFundEntity = z.infer<typeof multisigFundSchema>

export function createDefaultFund(): Signal<MultisigFundEntity> {
  return signal({
    fund: 1,
  })
}

export function MultisigFund() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MultisigFundEntity>({
    resolver: zodResolver(multisigFundSchema),
    mode: "onChange",
  })
  const { goNext, goPrev } = useWizardNavigation()
  const { formDataStep, updateFormDataStep } = useWizardFormDataStep<
    MultisigFundEntity
  >()

  const onSubmit = (formDataNew: MultisigFundEntity) => {
    updateFormDataStep(formDataNew)
    goNext()
  }

  const onBack = (formDataNew: MultisigFundEntity) => {
    updateFormDataStep(formDataNew)
    goPrev()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">3. Fund the multisig</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Fund the multisig: <span class="text-pink-600">*</span>
      </label>
      <input
        {...register("fund", { valueAsNumber: true })}
        type="number"
        defaultValue={formDataStep.fund.toString()}
        class="block rounded-lg border border-gray-300 p-2 my-2 w-1/3"
      />
      {errors.fund && (
        <div class="bg-red-100 text-red-700 p-2 rounded mt-2 border border-red-300">
          {errors.fund.message}
        </div>
      )}
      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-between">
        <Button variant="ghost" onClick={handleSubmit(onBack)}>
          &lt; Back
        </Button>
        <Button type="submit">Sign &amp; fund</Button>
      </div>
    </form>
  )
}
