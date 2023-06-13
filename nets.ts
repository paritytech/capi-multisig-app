import { bins, net } from "capi"

const bin = bins({
  polkadot: ["polkadot-fast", "v0.9.38"],
})

export const westendDev = net.dev({
  bin: bin.polkadot,
  chain: "westend-dev",
})

export const westend = net.ws({
  url: "wss://westend-rpc.polkadot.io/",
})
