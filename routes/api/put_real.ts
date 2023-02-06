import { Handlers } from "$fresh/server.ts"
import { client, Put, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    await client.send(
      new Put({
        TableName,
        Item: {
          id: "alice", // crypto.randomUUID(),
          kind: "Real",
          proxies: [],
          multisigs: [],
        },
      }),
    )
    return new Response("Put Real - Success")
  },
}
