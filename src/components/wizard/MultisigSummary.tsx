import { Button } from '../Button'
import { useWizardNavigation, wizardState } from './Wizard'
import { MultisigStep } from './Wizard'

export function MultisigSummary() {
  const { formData } = wizardState
  const { goPrev } = useWizardNavigation()

  return (
    <div>
      <h1 class="font-normal text-xl leading-8">Summary</h1>
      <hr class="border-t border-gray-300 mt-6 mb-4" />
      <pre className="bg-gray-100 p-4 rounded-lg shadow-md overflow-x-auto">
        <div class="flex mb-2">
          <span class="font-bold text-gray-800 mr-2">Multisig name:</span>
          <span class="font-mono text-gray-900">
            {formData[MultisigStep.MultisigInit].value.name}
          </span>
        </div>
        <div class="flex mb-2">
          <span class="font-bold text-gray-800 mr-2">Multisig member:</span>
          <span class="font-mono text-gray-900">
            {formData[MultisigStep.MultisigMembers].value.member}
          </span>
        </div>
        <div class="flex mb-2">
          <span class="font-bold text-gray-800 mr-2">Multisig fund:</span>
          <span class="font-mono text-gray-900">
            {formData[MultisigStep.MultisigFund].value.fund}
          </span>
        </div>
      </pre>
      <hr class="border-t border-gray-300 mt-4 mb-2" />
      <div class="flex justify-start">
        <Button variant="ghost" type="submit" onClick={goPrev}>
          {'<'} Back
        </Button>
      </div>
    </div>
  )
}
