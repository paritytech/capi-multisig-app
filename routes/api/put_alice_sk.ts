import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    await client.send(
      new Put({
        TableName,
        Item: {
          pk: "alice", // crypto.randomUUID(),
          sk: "ab_multi",
          name: "Alice Watson Signer",
        },
      }),
    )
    return new Response("Put Alice - Success")
  },
}
