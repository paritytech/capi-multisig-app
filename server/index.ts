import { chain } from "@capi/westend"
import { initTRPC } from "@trpc/server"
/* import Alby from "ably" */
import { SignedExtrinsicRune } from "capi"
import * as $ from "scale-codec"
import { TypeSafeGetDocumentCommand } from "typesafe-dynamodb/lib/get-document-command.js"
import { TypeSafePutDocumentCommand } from "typesafe-dynamodb/lib/put-document-command.js"
import { client as ddbClient, TableName } from "./db.js"
import { $setup, Model } from "./models.js"
const t = initTRPC.create()
/* const alby = new Alby.Realtime.Promise({ key: process.env.ABLY_API_KEY }) */

export type router = typeof router
export const router = t.router({
  hello: t.procedure.query(() => "hello world"),
  something: t.procedure
    .input($.object(
      $.field("greeting", $.str),
      $.field("name", $.str),
    ))
    .query((req) => {
      const { greeting, name } = req.input
      console.log(greeting, name)
      return `${greeting} ${name}`
    }),
  setupPut: t.procedure.input($setup)
    .mutation(async ({ input }) => {
      const Cmd = TypeSafePutDocumentCommand<Model>()
      await ddbClient.send(
        new Cmd({
          TableName,
          Item: input,
        }),
      )

      /*       console.log(
        "result",
        await alby.channels.get("events").publish("setupPut", {
          message: input.id,
        }),
      ) */
    }),
  setupGet: t.procedure.input($.object($.field("id", $.str))).query(
    async ({ input }) => {
      const Cmd = TypeSafeGetDocumentCommand<Model, "id", "id">()

      const result = await ddbClient.send(
        new Cmd({
          TableName,
          Key: { id: input.id },
        }),
      )

      return result.Item
    },
  ),
  ratifyMultisig: t.procedure.input($.object($.field("hex", $.str)))
    .mutation(async ({ input }) => {
      await SignedExtrinsicRune
        .fromHex(chain as any, input.hex)
        .sent()
        .finalized()
        .run()
    }),
  /*   notifyMultisigWatchers: t.procedure.input($.object(
    $.field("multisigHash", $.str),
    $.field("callHash", $.str),
  )).mutation(async ({ input }) => {
    await alby.channels.get(input.multisigHash).publish(
      "callHash",
      input.callHash,
    )
  }), */
})
