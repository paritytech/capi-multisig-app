import type { Account } from "common/models.js"
import { Delete, docClient, Get, Put } from "./dynamoDB/db.js"
import { TableNames } from "./dynamoDB/table.js"

export class AccountController {
  static getKeys(accountId: string) {
    return { pk: accountId }
  }
  static async createAccount(account: Account) {
    const keys = AccountController.getKeys(account.accountId)
    const accountItem = { ...keys, ...account }
    await docClient.send(
      new Put({
        TableName: TableNames.account,
        Item: accountItem,
      }),
    )
  }
  static async getAccount(id: string) {
    const keys = AccountController.getKeys(id)
    const result = await docClient.send(
      new Get({ TableName: TableNames.account, Key: keys }),
    )
    return result.Item
  }

  static async deleteAccount(id: string) {
    const keys = AccountController.getKeys(id)
    docClient.send(
      new Delete({ TableName: TableNames.account, Key: keys }),
    )
  }
}
