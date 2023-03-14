import { computed, signal } from "@preact/signals"
import { toChildArray } from "preact"
import type { ComponentChildren } from "preact"
import { createDefaultFund } from "./MultisigFund.js"
import type { MultisigFundEntity } from "./MultisigFund.js"
import { createDefaultMultisigInit } from "./MultisigInit.js"
import type { MultisigInitEntity } from "./MultisigInit.js"
import { createDefaultMembers } from "./MultisigMembers.js"
import type { MultisigMemberEntity } from "./MultisigMembers.js"

export const multisigSteps = ["init", "members", "fund", "summary"] as const

export type MultisigEntities =
  | MultisigInitEntity
  | MultisigMemberEntity
  | MultisigFundEntity

export type FormData = ReturnType<typeof createDefaultFormData>

function createDefaultFormData() {
  return {
    [multisigSteps[0]]: createDefaultMultisigInit(),
    [multisigSteps[1]]: createDefaultMembers(),
    [multisigSteps[2]]: createDefaultFund(),
  }
}

function createWizardState() {
  const step = signal(0)
  const formData = computed(() => createDefaultFormData())

  return {
    step,
    formData: formData.value,
  }
}

export const wizardState = createWizardState()

export function useWizardNavigation() {
  const { step } = wizardState

  function goNext() {
    step.value = step.value + 1
  }

  function goPrev() {
    step.value = step.value - 1
  }
  return {
    goNext,
    goPrev,
  }
}

export function useWizardFormDataStep<T extends MultisigEntities>() {
  const { formData, step } = wizardState
  const stepIdx = multisigSteps[step.value] as keyof FormData
  const formDataStep = formData[stepIdx]

  const updateFormDataStep = (formDataNew: T) => {
    formDataStep.value = formDataNew
  }

  return {
    updateFormDataStep,
    formDataStep: formDataStep.value as T,
  }
}

export function Wizard({ children }: { children: ComponentChildren }) {
  return <>{toChildArray(children)[wizardState.step.value]}</>
}
