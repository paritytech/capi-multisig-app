import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    await client.send(
      new Put({
        TableName,
        Item: {
          id: "alice_pure", // crypto.randomUUID(),
          kind: "Proxy",
        },
      }),
    )
    return new Response("Put Proxy - Success")
  },
}
