import { Westend, westend, WestendRune } from "@capi/westend"
import { WestendDev } from "@capi/westend-dev"
import { effect, Signal, signal } from "@preact/signals"
import { ChainRune } from "capi"

export type SupportedChain = Westend | WestendDev

const currentChain: Signal<ChainRune<SupportedChain, never>> = signal<
  ChainRune<SupportedChain, never>
>(westend)

function switchChain(newChain: ChainRune<SupportedChain, never>) {
  currentChain.value = newChain
}

effect(() => {
  ;(currentChain.value as unknown as WestendRune<Westend>).latestBlockNum
    .run()
    .then((latestBlockNum) => {
      console.log({ latestBlockNum: Number(latestBlockNum) })
    })
  ;(currentChain.value as unknown as WestendRune<Westend>).latestBlockHash
    .run()
    .then((latestBlockHash) => {
      console.log({ latestBlockHash })
    })
  ;(currentChain.value as unknown as WestendRune<Westend>).chainVersion
    .run()
    .then((chainVersion) => {
      console.log({ chainVersion })
    })
})
export { currentChain, switchChain }
