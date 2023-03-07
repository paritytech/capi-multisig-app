import { toChildArray } from 'preact'
import type { ComponentChildren } from 'preact'
import { signal, computed } from '@preact/signals'
import type { Signal } from '@preact/signals'

import { createDefaultMultisigInit } from './MultisigInit'
import type { IMultisigInitEntity } from './MultisigInit'
import { createDefaultMembers } from './MultisigMembers'
import type { IMultisigMemberEntity } from './MultisigMembers'
import { createDefaultFund } from './MultisigFund'
import type { IMultisigFundEntity } from './MultisigFund'

export enum MultisigStep {
  MultisigInit,
  MultisigMembers,
  MultisigFund,
  MultisigSummary,
}

export interface IFormData {
  [MultisigStep.MultisigInit]: Signal<IMultisigInitEntity>
  [MultisigStep.MultisigMembers]: Signal<IMultisigMemberEntity>
  [MultisigStep.MultisigFund]: Signal<IMultisigFundEntity>
}

export type IMultisigEntities =
  | IMultisigInitEntity
  | IMultisigMemberEntity
  | IMultisigFundEntity

function createDefaultFormData(): IFormData {
  return {
    [MultisigStep.MultisigInit]: createDefaultMultisigInit(),
    [MultisigStep.MultisigMembers]: createDefaultMembers(),
    [MultisigStep.MultisigFund]: createDefaultFund(),
  }
}

function createWizardState() {
  const activeStep = signal(0)
  const formData = computed(() => createDefaultFormData())

  return {
    activeStep,
    formData: formData.value,
  }
}

export const wizardState = createWizardState()

export function useWizardNavigation() {
  const { activeStep } = wizardState

  function goNext() {
    activeStep.value = activeStep.value + 1
  }

  function goPrev() {
    activeStep.value = activeStep.value - 1
  }
  return {
    goNext,
    goPrev,
  }
}

export function useWizardActiveForm<T extends IMultisigEntities>() {
  const { formData, activeStep } = wizardState
  const formDataActive = formData[activeStep.value as keyof IFormData]

  const updateFormDataActive = (formDataNew: T) => {
    formDataActive.value = formDataNew
  }

  return {
    updateFormDataActive,
    formDataActive: formDataActive.value as T
  }
}

export function Wizard({ children }: { children: ComponentChildren }) {
  return <>{toChildArray(children)[wizardState.activeStep.value]}</>
}
