import { Handlers } from "$fresh/server.ts"
import { client, Query, TableName } from "../../server/mod.ts"

export const handler: Handlers = {
  async POST(req) {
    const { pk } = await req.json()

    const res = await client.send(
      new Query({
        TableName,
        KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
        ExpressionAttributeNames: { "#pk": "pk", "#sk": "sk" }, // optional names substitution
        ExpressionAttributeValues: {
          ":pk": pk,
          ":sk": "MULTI#",
        },
      }),
    )

    return new Response(JSON.stringify(res))
  },
}
