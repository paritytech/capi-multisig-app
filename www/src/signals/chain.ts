import { Westend } from "@capi/westend"
import { WestendDev, westendDev } from "@capi/westend-dev"
import { Signal, signal } from "@preact/signals"
import { ChainRune } from "capi"

export type SupportedChain = Westend | WestendDev

const currentChain: Signal<ChainRune<SupportedChain, never>> = signal<
  ChainRune<SupportedChain, never>
>(westendDev)

function switchChain(newChain: ChainRune<SupportedChain, never>) {
  currentChain.value = newChain
}

export { currentChain, switchChain }
