import type { Account } from "common/models.js"
import { Delete, docClient, Get, Put } from "./dynamoDB/db.js"
import { TableNames } from "./dynamoDB/table.js"

export class ApiController {
  static async createAccount(account: Account) {
    await docClient.send(
      new Put({
        TableName: TableNames.account,
        Item: account,
      }),
    )
  }
  static async getAccount(id: string) {
    const result = await docClient.send(
      new Get({ TableName: TableNames.account, Key: { id } }),
    )
    return result.Item
  }

  static async deleteAccount(id: string) {
    docClient.send(
      new Delete({ TableName: TableNames.account, Key: { id } }),
    )
  }
}
