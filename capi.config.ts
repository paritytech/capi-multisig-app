import { binary, Config } from "capi"

const polkadot = binary("polkadot", "v0.9.38")

export const config: Config = {
  server: "https://capi.dev/@v0.1.0-beta.36/",
  chains: {
    westend: {
      url: "wss://westend-rpc.polkadot.io/",
      version: "v0.9.40",
    },
    westendDev: {
      binary: polkadot,
      chain: "westend-dev",
    },
  },
}