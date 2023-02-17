import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    await client.send(
      new Put({
        TableName,
        Item: {
          pk: "bob", // crypto.randomUUID(),
          sk: "real#bob",
          name: "Bob Davidson",
        },
      }),
    )
    return new Response("Put Bob - Success")
  },
}
