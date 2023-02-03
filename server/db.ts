// @deno-types="ddb/dist-types/index.d.ts"
import { DynamoDBClient } from "ddb/es2022/client-dynamodb.js"
// @deno-types="ddb_doc/dist-types/index.d.ts"
import { DynamoDBDocument } from "ddb_doc/es2022/lib-dynamodb.js"
// @deno-types="ts_ddb_types/document-client-v3.d.ts"
import { TypeSafeDocumentClientV3 } from "ts_ddb_runtime/document-client-v3.js"
// @deno-types="ts_ddb_types/put-document-command.d.ts"
import { TypeSafePutDocumentCommand } from "ts_ddb_runtime/put-document-command.js"
// @deno-types="ts_ddb_types/delete-document-command.d.ts"
import { TypeSafeDeleteDocumentCommand } from "ts_ddb_runtime/delete-document-command.js"
// @deno-types="ts_ddb_types/query-document-command.d.ts"
import { TypeSafeQueryDocumentCommand } from "ts_ddb_runtime/query-document-command.js"
// @deno-types="ts_ddb_types/scan-document-command.d.ts"
import { TypeSafeScanDocumentCommand } from "ts_ddb_runtime/scan-document-command.js"
// @deno-types="ts_ddb_types/update-document-command.d.ts"
import { TypeSafeUpdateDocumentCommand } from "ts_ddb_runtime/update-document-command.js"
// @deno-types="ts_ddb_types/get-document-command.d.ts"
import { TypeSafeGetDocumentCommand } from "ts_ddb_runtime/get-document-command.js"
import { Animal } from "./model.ts"
import "std/dotenv/load.ts"

export const client = DynamoDBDocument.from(
  new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID")!,
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
    },
  }),
) as unknown as TypeSafeDocumentClientV3<Animal, "id">

export const Put = TypeSafePutDocumentCommand<Animal>()
export const Delete = TypeSafeDeleteDocumentCommand<Animal, "id", undefined>()
export const Query = TypeSafeQueryDocumentCommand<Animal>()
export const Scan = TypeSafeScanDocumentCommand<Animal>()
export const Update = TypeSafeUpdateDocumentCommand<Animal, "id", undefined>()
export const Get = TypeSafeGetDocumentCommand<Animal, "id", undefined>()

export const TableName = "capi_multisig"
