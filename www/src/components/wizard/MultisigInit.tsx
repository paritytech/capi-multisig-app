import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { signal } from "@preact/signals"
import type { Signal } from "@preact/signals"
import { useForm } from "react-hook-form"
import { defaultAccount } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import { MultisigInitEntity, multisigInitSchema } from "./schema.js"
import { useWizardFormDataStep, useWizardNavigation } from "./Wizard.js"

export function createDefaultMultisigInit(): Signal<MultisigInitEntity> {
  return signal({
    name: "",
    memberCount: 2,
    treshold: 2,
  })
}

export function MultisigInit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MultisigInitEntity>({
    resolver: zodResolver(multisigInitSchema),
    mode: "onChange",
  })
  const { goNext } = useWizardNavigation()
  const { formDataStep, updateFormDataStep } = useWizardFormDataStep<
    MultisigInitEntity
  >()

  const onSubmit = (formDataNew: MultisigInitEntity) => {
    updateFormDataStep(formDataNew)
    goNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 class="text-xl leading-8">1. Multisig setup</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <label class="leading-6">
        Multisig Name <span class="text-pink-600">*</span>
      </label>
      <input
        {...register("name")}
        id="name"
        defaultValue={formDataStep.name}
        placeholder="Enter the name..."
        class="block rounded-lg border border-gray-300 p-2 mt-2 mb-4 w-1/2"
      />
      {errors.name && (
        <div class="field-error">
          {errors.name.message}
        </div>
      )}
      <label class="leading-6">
        Creator
      </label>
      <div className="mb-4">
        {`${defaultAccount.value?.name}  ${defaultAccount.value?.address}`}
      </div>
      <div className="flex">
        <div>
          <label class="leading-6">
            Members
          </label>
          <input
            {...register("memberCount", { valueAsNumber: true })}
            id="members"
            type="number"
            min={0}
            defaultValue={formDataStep.memberCount.toString()}
            class="block rounded-lg border border-gray-300 p-2 mt-2 mb-4 w-1/2"
          />
          {errors.memberCount && (
            <div class="field-error">
              {errors.memberCount.message}
            </div>
          )}
        </div>
        <div>
          <label class="leading-6">
            Treshold
          </label>
          <input
            {...register("treshold", {
              valueAsNumber: true,
              validate: (t) => t < formDataStep.memberCount,
            })}
            id="treshold"
            type="number"
            min={0}
            defaultValue={formDataStep.treshold.toString()}
            class="block rounded-lg border border-gray-300 p-2 mt-2 mb-4 w-1/2"
          />
          {errors.treshold && (
            <div class="field-error">
              {errors.treshold.message}
            </div>
          )}
        </div>
      </div>

      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-end">
        <Button variant="ghost" type="submit">
          Next &gt;
        </Button>
      </div>
    </form>
  )
}
