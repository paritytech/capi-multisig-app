import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async POST(req) {
    const { pk, sk, signatories = [], threshold, name } = await req.json()

    await client.send(
      new Put({
        TableName,
        Item: {
          pk,
          sk,
          name,
          kind: "Multisig",
          signatories,
          threshold,
        },
      }),
    )
    return new Response("Put Multisig - Success")
  },
}
