import { toChildArray } from 'preact'
import type { ComponentChildren } from 'preact'
import { signal, computed } from '@preact/signals'
import type { Signal } from '@preact/signals'

import { createDefaultMultisigInit } from './MultisigInit'
import type { MultisigInitEntity } from './MultisigInit'
import { createDefaultMembers } from './MultisigMembers'
import type { MultisigMemberEntity } from './MultisigMembers'
import { createDefaultFund } from './MultisigFund'
import type { MultisigFundEntity } from './MultisigFund'

export enum MultisigStep {
  Init = 'init',
  Members = 'member',
  Fund = 'fund',
  Summary = 'summary',
}

export const multisigSteps: MultisigStep[] = [
  MultisigStep.Init,
  MultisigStep.Members,
  MultisigStep.Fund,
  MultisigStep.Summary,
]

export interface FormData {
  [MultisigStep.Init]: Signal<MultisigInitEntity>
  [MultisigStep.Members]: Signal<MultisigMemberEntity>
  [MultisigStep.Fund]: Signal<MultisigFundEntity>
}

export type MultisigEntities =
  | MultisigInitEntity
  | MultisigMemberEntity
  | MultisigFundEntity

function createDefaultFormData(): FormData {
  return {
    [MultisigStep.Init]: createDefaultMultisigInit(),
    [MultisigStep.Members]: createDefaultMembers(),
    [MultisigStep.Fund]: createDefaultFund(),
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
