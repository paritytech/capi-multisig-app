import { createTRPCReact } from "@trpc/react-query"
import { type router } from "server"

export const trpc: ReturnType<typeof createTRPCReact<router>> = createTRPCReact<
  router
>()
