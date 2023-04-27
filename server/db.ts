import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { Model } from "common/models.js"
import { TypeSafeDeleteDocumentCommand } from "typesafe-dynamodb/lib/delete-document-command.js"
import { TypeSafeDocumentClientV3 } from "typesafe-dynamodb/lib/document-client-v3.js"
import { TypeSafeGetDocumentCommand } from "typesafe-dynamodb/lib/get-document-command.js"
import { TypeSafePutDocumentCommand } from "typesafe-dynamodb/lib/put-document-command.js"
import { TypeSafeQueryDocumentCommand } from "typesafe-dynamodb/lib/query-document-command.js"
import { TypeSafeScanDocumentCommand } from "typesafe-dynamodb/lib/scan-document-command.js"
import { TypeSafeUpdateDocumentCommand } from "typesafe-dynamodb/lib/update-document-command.js"
import "dotenv"

export const client = DynamoDBDocument.from(
  new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.NODE_ENV !== "production"
        ? "accessKey"
        : process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.NODE_ENV !== "production"
        ? "secretKey"
        : process.env.AWS_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.NODE_ENV !== "production"
      ? "http://localhost:8000"
      : undefined,
  }),
) as unknown as TypeSafeDocumentClientV3<Model, "id">

export const Put = TypeSafePutDocumentCommand<Model>()
export const Delete = TypeSafeDeleteDocumentCommand<Model, "id", undefined>()
export const Query = TypeSafeQueryDocumentCommand<Model>()
export const Scan = TypeSafeScanDocumentCommand<Model>()
export const Update = TypeSafeUpdateDocumentCommand<Model, "id", undefined>()
export const Get = TypeSafeGetDocumentCommand<Model, "id", undefined>()

export const TableName = "capi_multisig"
