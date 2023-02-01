import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    await client.send(
      new Put({
        TableName,
        Item: {
          id: crypto.randomUUID(),
          kind: "Dog",
          bark: "loud",
        },
      }),
    )
    return new Response("Hi")
  },
}
