import { Signal, signal } from "@preact/signals"
import { Scope } from "capi"

const scope: Signal<Scope> = signal<Scope>(new Scope())

export { scope }
