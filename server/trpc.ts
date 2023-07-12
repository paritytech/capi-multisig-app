import { initTRPC } from "@trpc/server"
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcStandAlone from "@trpc/server/adapters/standalone"
import { $account, $calldata, $setup } from "common"
import * as $ from "scale-codec"
import {
  AccountController,
  CalldataController,
  MultisigController,
} from "./controllers.js"
import { createTablesIfNotExist } from "./dynamoDB/table.js"

export async function createContext(
  {}: trpcStandAlone.CreateHTTPContextOptions,
) {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

export const router = t.router({
  // health check
  "": t.procedure.query(() => undefined),
  // db check: check tables exist and create if not:
  dbCheck: t.procedure.query(async () => {
    return createTablesIfNotExist()
  }),
  // multisig
  addMultisig: t.procedure.input($setup).mutation(async (req) => {
    return MultisigController.createSetup(req.input)
  }),
  getMultisig: t.procedure.input($.str).query(async (req) => {
    return MultisigController.getSetup(req.input)
  }),
  deleteMultisig: t.procedure.input($.str).mutation(async (req) => {
    return MultisigController.deleteSetup(req.input)
  }),

  // account
  addAccount: t.procedure.input($account).mutation(async (req) => {
    return AccountController.createAccount(req.input)
  }),
  getAccount: t.procedure.input($.str).query(async (req) => {
    return AccountController.getAccount(req.input)
  }),
  getAccountSetups: t.procedure.input($.str).query(async (req) => {
    return AccountController.getSetups(req.input)
  }),
  deleteAccount: t.procedure.input($.str).mutation(async (req) => {
    return AccountController.deleteAccount(req.input)
  }),

  // calldata
  addCalldata: t.procedure.input($calldata).mutation(async (req) => {
    return CalldataController.addCalldata(req.input)
  }),
  getCalldata: t.procedure.input($.str).query(async (req) => {
    return CalldataController.getCalldata(req.input)
  }),
  deleteCalldata: t.procedure.input($.str).mutation(async (req) => {
    return CalldataController.deleteCalldata(req.input)
  }),
})

export type AppRouter = typeof router
