import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async POST(req) {
    const { pk, sk } = await req.json()

    await client.send(
      new Put({
        TableName,
        Item: {
          pk,
          sk,
          kind: "Real",
        },
      }),
    )

    return new Response("Put Account - Success")
  },
}
