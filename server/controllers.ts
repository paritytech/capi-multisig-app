import type { Account } from "common/models.js"
import { Delete, docClient, Put } from "./dynamoDB/db.js"
import { TableNames } from "./dynamoDB/table.js"

export class ApiController {
  static async createAccount(account: Account) {
    const result = await docClient.send(
      new Put({
        TableName: TableNames.account,
        Item: account,
      }),
    )
    console.log(JSON.stringify(result))
  }
  static async deleteAccount(id: string) {
    docClient.send(
      new Delete({ TableName: TableNames.account, Key: { id } }),
    )
  }
}
