import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { ComponentChildren } from "preact"
import { useState } from "preact/hooks"
import { trpc } from "./trpc.js"

type Props = {
  children: ComponentChildren
}

export function ApiProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:5555",

          // ToDo: Add auth token
          async headers() {
            return {
              authorization: "bearer:",
            }
          },
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}
