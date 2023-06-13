import { Local, local } from "@capi/local"
import { Westend, westend } from "@capi/westend"
import { WestendDev, westendDev } from "@capi/westend-dev"
import { Signal, signal } from "@preact/signals"
import { ChainRune } from "capi"

export type SupportedChain = Local | Westend | WestendDev

const currentChain: Signal<ChainRune<SupportedChain, never>> = signal<
  ChainRune<SupportedChain, never>
>(westendDev)

function switchChain(newChain: ChainRune<SupportedChain, never>) {
  currentChain.value = newChain
}

export { currentChain, switchChain }
