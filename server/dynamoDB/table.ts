import {
  CreateTableCommand,
  CreateTableCommandInput,
  DescribeTableCommand,
  DynamoDBClient,
} from "@aws-sdk/client-dynamodb"
import { dbClient } from "./db.js"

export const TableNames = {
  multisig: "capi_multisig",
  account: "capi_account",
  history: "capi_history",
} as const

export const Schemas: CreateTableCommandInput[] = [
  {
    TableName: TableNames.multisig,
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  {
    TableName: TableNames.account,
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  {
    TableName: TableNames.history,
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: "S",
      },
      {
        AttributeName: "sk",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: "HASH",
      },
      {
        AttributeName: "sk",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
]

async function tableExists(dbclient: DynamoDBClient, tableName: string) {
  // DescribeTable command
  const command = new DescribeTableCommand({ TableName: tableName })
  try {
    // Send the DescribeTable command
    await dbclient.send(command)
    return true // Table exists
  } catch (error) {
    if ((error as Error).name === "ResourceNotFoundException") {
      return false // Table does not exist
    } else {
      throw error // Propagate other errors
    }
  }
}

export async function createTablesIfNotExist() {
  for (let schema of Schemas) {
    const tableName = schema.TableName
    const exists = !!tableName && await tableExists(dbClient, tableName)
    if (!exists) {
      const command = new CreateTableCommand(schema)
      await dbClient.send(command)
      console.log(`Table Created: ${tableName}`)
    }
  }
}
