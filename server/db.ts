// @deno-types="https://esm.sh/v106/@aws-sdk/client-dynamodb@3.262.0/dist-types/index.d.ts"
import {
  DynamoDBClient,
} from "https://esm.sh/v106/@aws-sdk/client-dynamodb@3.262.0/es2022/client-dynamodb.js"
// @deno-types="https://esm.sh/v106/@aws-sdk/lib-dynamodb@3.262.0/dist-types/index.d.ts"
import { DynamoDBDocument } from "https://esm.sh/v106/@aws-sdk/lib-dynamodb@3.262.0/es2022/lib-dynamodb.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/document-client-v3.d.ts"
import { TypeSafeDocumentClientV3 } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/document-client-v3.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/put-document-command.d.ts"
import { TypeSafePutDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/put-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/delete-document-command.d.ts"
import { TypeSafeDeleteDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/delete-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/query-document-command.d.ts"
import { TypeSafeQueryDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/query-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/scan-document-command.d.ts"
import { TypeSafeScanDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/scan-document-command.js"
// @deno-types="https://esm.sh/v106/typesafe-dynamodb@0.2.3/lib/update-document-command.d.ts"
import { TypeSafeUpdateDocumentCommand } from "https://esm.sh/v106/typesafe-dynamodb@0.2.3/es2022/lib/update-document-command.js"
import { Animal } from "./model.ts"

export const client = DynamoDBDocument.from(
  new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
    },
  }),
) as unknown as TypeSafeDocumentClientV3<Animal, "id">

export const Put = TypeSafePutDocumentCommand<Animal>()
export const Delete = TypeSafeDeleteDocumentCommand<Animal, "id", undefined>()
export const Query = TypeSafeQueryDocumentCommand<Animal>()
export const Scan = TypeSafeScanDocumentCommand<Animal>()
export const Update = TypeSafeUpdateDocumentCommand<Animal, "id", undefined>()

export const TableName = "capi_multisig"
