import { signal } from "@preact/signals"
import type { Signal } from "@preact/signals"
import { toChildArray } from "preact"
import type { ComponentChildren } from "preact"
import type { FormData } from "./schemas.js"

type WizardState = {
  step: Signal<number>
  formData: Signal<FormData>
}

export const wizardState: WizardState = {
  step: signal(0),
  formData: signal({
    name: "",
    memberCount: 2,
    threshold: 2,
    members: [],
    fund: 1,
  }),
}

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

export function useWizardFormData() {
  const { formData } = wizardState

  const updateFormData = (formDataNew: Partial<FormData>) => {
    Object.assign(formData.value, formDataNew)
  }

  return {
    updateFormData,
    formData: formData.value,
  }
}

export function Wizard({ children }: { children: ComponentChildren }) {
  return <>{toChildArray(children)[wizardState.step.value]}</>
}
