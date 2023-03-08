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
  MultisigInit,
  MultisigMembers,
  MultisigFund,
  MultisigSummary,
}

export interface FormData {
  [MultisigStep.MultisigInit]: Signal<MultisigInitEntity>
  [MultisigStep.MultisigMembers]: Signal<MultisigMemberEntity>
  [MultisigStep.MultisigFund]: Signal<MultisigFundEntity>
}

export type MultisigEntities =
  | MultisigInitEntity
  | MultisigMemberEntity
  | MultisigFundEntity

function createDefaultFormData(): FormData {
  return {
    [MultisigStep.MultisigInit]: createDefaultMultisigInit(),
    [MultisigStep.MultisigMembers]: createDefaultMembers(),
    [MultisigStep.MultisigFund]: createDefaultFund(),
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
  const formDataStep = formData[step.value as keyof FormData]

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
