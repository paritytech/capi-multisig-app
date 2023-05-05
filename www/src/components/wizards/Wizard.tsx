import { signal } from "@preact/signals"
import { toChildArray } from "preact"
import type { ComponentChildren } from "preact"

let step = signal(0)

export function goNext() {
  step.value = step.value + 1
}

export function goPrev() {
  step.value = step.value - 1
}

export function Wizard({ children }: { children: ComponentChildren }) {
  return <>{toChildArray(children)[step.value]}</>
}
