import { westend } from "@capi/westend"
import { initTRPC } from "@trpc/server"
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcStandAlone from "@trpc/server/adapters/standalone"
import { createDevUsers, ss58 } from "capi"
import { multisigAccountId, MultisigRune } from "capi/patterns/multisig"
import { $account, $calldata, $setup, u8aToHex } from "common"
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

  //
  testDb: t.procedure.query(async () => {
    console.log(process.env.CAPI_SERVER)
    await createTablesIfNotExist()
    /*const id = "5F3sa2TJAWMqDhXG6jhV4N8ko9SxwGy8TpaNS1repo5EYjQX"
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
    */

    const { alexa, billy, carol, david } = await createDevUsers()

    /// Initialize the `MultisigRune` with Alexa, Billy and Carol. Set the passing threshold to 2.
    const multisig = MultisigRune.from(westend, {
      signatories: [alexa, billy, carol].map(({ publicKey }) => publicKey),
      threshold: 2,
    })

    // generate multisigID:
    const idRaw = await multisig.accountId.run()
    const id = u8aToHex(idRaw)
    // const address = ss58.encode(await westend.addressPrefix().run(), idRaw)
    console.log(`id: ${id}`)

    const setup = {
      name: "hamid",
      id,
      multisigHex: await multisig.hex.run(),
    }
    await MultisigController.createSetup(
      setup,
    )

    // get
    const item = await MultisigController.getSetup(id)
    console.log(item)
    return item
  }),
})

export type AppRouter = typeof router
