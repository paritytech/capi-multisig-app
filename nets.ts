import { net } from "capi/nets"

export const westend = net.ws({
  url: "wss://westend-rpc.polkadot.io/",
})
