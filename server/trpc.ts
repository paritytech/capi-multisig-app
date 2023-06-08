import { initTRPC } from "@trpc/server"
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcStandAlone from "@trpc/server/adapters/standalone"
import * as $ from "scale-codec"
import { AccountController, MultisigController } from "./controllers.js"
import { createTablesIfNotExist } from "./dynamoDB/table.js"

import { $setup } from "common/models.js"

export const $addMultisigParams = $.object(
  $.field("payload", $setup),
  $.field("signature", $.uint8Array),
)

export async function createContext(
  {}: trpcStandAlone.CreateHTTPContextOptions,
) {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

export type router = typeof router
export const router = t.router({
  "": t.procedure.query(() => undefined),
  addMultisig: t.procedure.input($addMultisigParams).mutation(async (req) => {
    MultisigController.createSetup(req.input)
  }),
  testDb: t.procedure.query(async () => {
    await createTablesIfNotExist()
    const id = "5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX"
    const setups = [
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
      "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    ]
    await AccountController.createAccount({
      id,
      setups,
    })
    const item = await AccountController.getAccount(id)
    await AccountController.deleteAccount(id)

    return item
  }),
})
