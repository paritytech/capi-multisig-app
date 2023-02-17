import { Handlers } from "$fresh/server.ts"
import { client, Get, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    const res = await client.send(
      new Get({
        TableName,
        Key: {
          pk: "alice",
        },
      }),
    )
    console.log("res: ", res)
    return new Response("GET")
  },
}
