import { westend } from "@capi/westend"
import { initTRPC } from "@trpc/server"
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcStandAlone from "@trpc/server/adapters/standalone"
import { createDevUsers, ss58 } from "capi"
import { multisigAccountId, MultisigRune } from "capi/patterns/multisig"
import { $setup, u8aToHex } from "common"
import * as $ from "scale-codec"
import { AccountController, MultisigController } from "./controllers.js"
import { createTablesIfNotExist } from "./dynamoDB/table.js"

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
    console.log(process.env.CAPI_SERVER)
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

    return item*/

    const { alexa, billy, carol, david } = await createDevUsers()

    /// Initialize the `MultisigRune` with Alexa, Billy and Carol. Set the passing threshold to 2.
    const multisig = MultisigRune.from(westend, {
      signatories: [alexa, billy, carol].map(({ publicKey }) => publicKey),
      threshold: 2,
    })
    const setup = {
      name: "hamid",
      multisigHex: await multisig.hex.run(),
    }
    MultisigController.createSetup({
      payload: setup,
      signature: new Uint8Array(),
    })

    // get
    const idRaw = await multisig.accountId.run()
    const id = u8aToHex(idRaw)
    const address = ss58.encode(await westend.addressPrefix().run(), idRaw)
    console.log(address)
    const item = await MultisigController.getSetup(id)
    return item
  }),
})
