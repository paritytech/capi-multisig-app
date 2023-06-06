import { westend } from "@capi/westend"
import { initTRPC } from "@trpc/server"
import { inferAsyncReturnType } from "@trpc/server"
import * as trpcStandAlone from "@trpc/server/adapters/standalone"
import { Sr25519 } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import * as $ from "scale-codec"
import { v4 as uuid } from "uuid"
import { client, Put } from "./db.js"

export async function createContext(
  {}: trpcStandAlone.CreateHTTPContextOptions,
) {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

export const $addMultisigPayload = $.object(
  $.field("name", $.str),
  $.field("multisigHex", $.str),
  $.field("timestamp", $.u64),
  $.optionalField("stash", $.str),
)

export const $addMultisigParams = $.object(
  $.field("payload", $addMultisigPayload),
  $.field("signature", $.uint8Array),
)

export type router = typeof router
export const router = t.router({
  "": t.procedure.query(() => undefined),
  addMultisig: t.procedure.input($addMultisigParams).mutation(async (req) => {
    const { payload, signature } = req.input

    const multisig = await MultisigRune.fromHex(westend, payload.multisigHex)
      .run()
    if (multisig.signatories.length === 0) {
      throw new Error("invalid multisig")
    }

    const isValidSignature = multisig.signatories
      .map((signatory) =>
        Sr25519.verify(
          signatory,
          $addMultisigPayload.encode(payload),
          signature,
        )
      )
      .find((result) => result) ?? false

    if (!isValidSignature) {
      throw new Error("invalid signature")
    }

    const id = uuid()
    await client.send(
      new Put({
        TableName: "setups",
        Item: {
          type: "setup",
          id,
          name: payload.name,
          multisigHex: payload.multisigHex,
        },
      }),
    )

    return id
  }),
})
