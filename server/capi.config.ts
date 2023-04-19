import { CapiConfig } from "capi"

export const config: CapiConfig = {
  server: "https://capi.dev/@v0.1.0-beta.35/",
  chains: {
    westend: {
      url: "wss://westend-rpc.polkadot.io/",
      version: "v0.9.40",
    },
  },
}
