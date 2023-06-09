import { net } from "capi"

export const polkadot = net.ws({
  url: "wss://rpc.polkadot.io",
  version: "v0.9.42",
})
