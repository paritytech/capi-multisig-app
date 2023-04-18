import { Handler } from "@netlify/functions"
import { router } from "server"
import { netlifyTRPCHandler } from "trpc-netlify-functions"
import { createContext } from "../../../trpc/context.js"

export const handler: Handler = netlifyTRPCHandler({
  router,
  createContext,
})
