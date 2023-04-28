import { signal } from "@preact/signals"
import { toChildArray } from "preact"
import type { ComponentChildren } from "preact"

const step = signal(0)

function goNext() {
  step.value = step.value + 1
}

function goPrev() {
  step.value = step.value - 1
}

export function useWizardNavigation() {
  return {
    goNext,
    goPrev,
  }
}

export function Wizard({ children }: { children: ComponentChildren }) {
  return <>{toChildArray(children)[step.value]}</>
}
