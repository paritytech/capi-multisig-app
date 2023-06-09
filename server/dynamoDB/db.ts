import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import type { Model, PartitionKey, SortKey } from "common"
import { TypeSafeDeleteDocumentCommand } from "typesafe-dynamodb/lib/delete-document-command.js"
import { TypeSafeDocumentClientV3 } from "typesafe-dynamodb/lib/document-client-v3.js"
import { TypeSafeGetDocumentCommand } from "typesafe-dynamodb/lib/get-document-command.js"
import { TypeSafePutDocumentCommand } from "typesafe-dynamodb/lib/put-document-command.js"
import { TypeSafeQueryDocumentCommand } from "typesafe-dynamodb/lib/query-document-command.js"
import { TypeSafeScanDocumentCommand } from "typesafe-dynamodb/lib/scan-document-command.js"
import { TypeSafeUpdateDocumentCommand } from "typesafe-dynamodb/lib/update-document-command.js"
import "dotenv"

let accessKeyId
let secretAccessKey
let endpoint

if (process.env.NODE_ENV === "production") {
  accessKeyId = process.env.AWS_ACCESS_KEY_ID!
  secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!
  endpoint = undefined
} else {
  accessKeyId = "accessKey"
  secretAccessKey = "secretKey"
  endpoint = "http://localhost:8000"
}

export const dbClient = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  endpoint,
})

export const docClient = DynamoDBDocument.from(
  dbClient,
) as unknown as TypeSafeDocumentClientV3<
  Model,
  PartitionKey,
  SortKey | undefined
>

export const Put = TypeSafePutDocumentCommand<Model>()
export const Delete = TypeSafeDeleteDocumentCommand<
  Model,
  PartitionKey,
  SortKey | undefined
>()
export const Query = TypeSafeQueryDocumentCommand<Model>()
export const Scan = TypeSafeScanDocumentCommand<Model>()
export const Update = TypeSafeUpdateDocumentCommand<
  Model,
  PartitionKey,
  SortKey | undefined
>()
export const Get = TypeSafeGetDocumentCommand<
  Model,
  PartitionKey,
  SortKey | undefined
>()
