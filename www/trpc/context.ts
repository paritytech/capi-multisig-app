import { inferAsyncReturnType } from "@trpc/server"
import { CreateNetlifyContextOptions } from "trpc-netlify-functions"

export function createContext(_: CreateNetlifyContextOptions) {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>
