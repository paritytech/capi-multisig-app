import { Handlers } from "$fresh/server.ts"
import { client, TableName, Update } from "../../server/mod.ts"

export const handler: Handlers = {
  async GET() {
    await client.send(
      new Update({
        TableName,
        Key: {
          sk: "alice",
          pk: "",
        },
        UpdateExpression: "SET proxies = list_append(proxies, :i)",
        ExpressionAttributeValues: {
          ":i": ["alice_pure"],
        },
      }),
    )
    return new Response("Update Real - Success")
  },
}
