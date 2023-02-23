import { Handlers } from "$fresh/server.ts"
import { client, Get, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    const res = await client.send(
      new Get({
        TableName,
        Key: {
          pk: "43fddbf1-1149-4b70-837c-74530517a854",
        },
      }),
    )
    console.log("res: ", res)
    return new Response("GET")
  },
}
