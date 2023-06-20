import { signal } from "@preact/signals"
import { toChildArray } from "preact"
import type { ComponentChildren } from "preact"
import { useEffect } from "preact/hooks"

let step = signal(0)

export function goNext() {
  step.value = step.value + 1
}

export function goPrev() {
  step.value = step.value - 1
}

export function Wizard({ children }: { children: ComponentChildren }) {
  useEffect(function onUnmount() {
    return () => {
      step.value = 0
    }
  }, [])
  return <>{toChildArray(children)[step.value]}</>
}
