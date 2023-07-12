import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/trpc.js"

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "https://api.multisig.capi.dev",

      // ToDo: Add auth token
      async headers() {
        return {
          authorization: "bearer:",
        }
      },
    }),
  ],
})
