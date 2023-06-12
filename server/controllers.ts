import type { Account, Calldata, Setup } from "common"
import { $setup, u8aToHex } from "common"
import { Delete, docClient, Get, Put } from "./dynamoDB/db.js"
import { TableNames } from "./dynamoDB/table.js"

import { westend } from "@capi/westend"
import { Sr25519 } from "capi"
import { MultisigRune } from "capi/patterns/multisig"

export class MultisigController {
  static getKeys(multisigId: string) {
    return { pk: multisigId }
  }
  static async createSetup(
    setup: Setup,
  ) {
    // Validation
    const multisig = await MultisigRune.fromHex(westend, setup.multisigHex)
      .run()
    if (
      multisig.signatories.length < 2 || !multisig.threshold
      || multisig.threshold < 2
    ) {
      throw new Error("invalid multisig")
    }

    // ToDo: Authorization
    // Check the account submitting the call is in signatories

    // Put item in DB
    const keys = MultisigController.getKeys(setup.id)
    const setupItem = { ...keys, ...setup }
    console.log(setupItem)
    await docClient.send(
      new Put({
        TableName: TableNames.multisig,
        Item: setupItem,
      }),
    )
  }

  static async getSetup(id: string) {
    const keys = MultisigController.getKeys(id)
    const result = await docClient.send(
      new Get({ TableName: TableNames.account, Key: keys }),
    )
    return result.Item
  }

  static async deleteSetup(id: string) {
    const keys = MultisigController.getKeys(id)
    docClient.send(
      new Delete({ TableName: TableNames.account, Key: keys }),
    )
  }
}

export class AccountController {
  static getKeys(accountId: string) {
    return { pk: accountId }
  }
  static async createAccount(account: Account) {
    const keys = AccountController.getKeys(account.id)
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

export class CalldataController {
  static getKeys(callHash: string) {
    return { pk: callHash }
  }
  static async addCalldata(calldata: Calldata) {
    const keys = CalldataController.getKeys(calldata.hash)
    const item = { ...keys, ...calldata }
    await docClient.send(
      new Put({
        TableName: TableNames.calldata,
        Item: item,
      }),
    )
  }
  static async getCalldata(hash: string) {
    const keys = CalldataController.getKeys(hash)
    const result = await docClient.send(
      new Get({ TableName: TableNames.calldata, Key: keys }),
    )
    return result.Item
  }

  static async deleteCalldata(hash: string) {
    const keys = AccountController.getKeys(hash)
    docClient.send(
      new Delete({ TableName: TableNames.calldata, Key: keys }),
    )
  }
}
