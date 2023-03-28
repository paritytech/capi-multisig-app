import { Button } from "../Button.js"
import { IconChevronLeft } from "../icons/IconChevronLeft.js"
import { useWizardFormData, useWizardNavigation } from "./Wizard.js"

export function MultisigSummary() {
  const { formData: { value: { name, fund, members } } } = useWizardFormData()
  const { goPrev } = useWizardNavigation()

  return (
    <div>
      <h1 class="text-xl leading-8">Summary</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <pre class="bg-gray-100 p-4 rounded-lg shadow-md overflow-x-auto space-y-2">
        <div class="flex items-center">
          <span class="font-bold text-gray-800">Multisig name:</span>
          <span class="font-mono text-gray-900">
            {name}
          </span>
        </div>
        <div class=" items-center">
          <span class="font-bold text-gray-800">Multisig members:</span>
          <ul class="font-mono text-gray-900">
            {members.map((v, i)=><li key={i}>{v?.address}</li>)}
          </ul>
        </div>
        <div class="flex items-center">
          <span class="font-bold text-gray-800">Multisig fund:</span>
          <span class="font-mono text-gray-900">
            {fund}
          </span>
        </div>
      </pre>
      <hr class="divide-x-0 divide-gray-300 mt-4 mb-2" />
      <div class="flex justify-start">
        <Button
          variant="ghost"
          type="submit"
          onClick={goPrev}
          iconLeft={<IconChevronLeft />}
        >
          Back
        </Button>
      </div>
    </div>
  )
}
