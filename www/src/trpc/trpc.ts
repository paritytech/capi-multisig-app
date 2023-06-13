import { createTRPCReact } from "@trpc/react-query"
import type { AppRouter } from "server/trpc.js"

export const trpc = createTRPCReact<AppRouter>()
