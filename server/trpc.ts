import { initTRPC } from "@trpc/server"
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcStandAlone from "@trpc/server/adapters/standalone"
import { createDevUsers } from "capi"
import * as $ from "scale-codec"
import { AccountController, MultisigController } from "./controllers.js"
import { createTablesIfNotExist } from "./dynamoDB/table.js"

import { polkadot } from "@capi/polkadot"
import { MultisigRune } from "capi/patterns/multisig"
import { $setup } from "common"

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
    const multisig = MultisigRune.from(polkadot, {
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
  }),
})
