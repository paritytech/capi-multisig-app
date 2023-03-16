import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { useForm } from "react-hook-form"
import { accounts, defaultAccount } from "../../signals/accounts.js"
import { Button } from "../Button.js"
import { MultisigInitEntity, multisigInitSchema } from "./schema.js"
import {
  useWizardFormData,
  useWizardNavigation,
  wizardState,
} from "./Wizard.js"

// TODO: Remove -> Example of working wizardState outside of a preact component
console.log("wizardState", wizardState)

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
  const { formData, updateFormData } = useWizardFormData()

  const onSubmit = (formDataNew: MultisigInitEntity) => {
    // TODO:
    // Improve prefilling of members for the next step.
    // Handle case on Back button from Members without prefilling again
    let members = accounts.value.slice(0, formDataNew.memberCount).map((a) =>
      a.address
    )

    if (members.length < formDataNew.memberCount) {
      members = [
        ...members,
        ...Array(formDataNew.memberCount - members.length),
      ]
    }

    updateFormData({ ...formDataNew, members })
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
        defaultValue={formData.name}
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
            defaultValue={formData.memberCount.toString()}
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
              validate: (t) => t < formData.memberCount,
            })}
            id="treshold"
            type="number"
            min={0}
            defaultValue={formData.treshold.toString()}
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
