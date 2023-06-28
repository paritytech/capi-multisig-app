import type { Account, AccountItem, Calldata, Setup, SetupItem } from "common"
import { $setup, u8aToHex } from "common"
import { Delete, docClient, Get, Put, Update } from "./dynamoDB/db.js"
import { TableNames } from "./dynamoDB/table.js"

import { westend } from "@capi/westend"
import { Sr25519, ss58 } from "capi"
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
    const putSetupTx = docClient.send(
      new Put({
        TableName: TableNames.multisig,
        Item: setupItem,
      }),
    )

    // update members to add the new setup to their account
    const updateAccountTx = []
    for (const signatory of multisig.signatories) {
      const id = ss58.encode(42, signatory)
      updateAccountTx.push(AccountController.addSetups(id, [setup.id]))
    }

    // await on all
    await Promise.all([putSetupTx, ...updateAccountTx])
  }

  static async getSetup(id: string) {
    const keys = MultisigController.getKeys(id)
    const result = await docClient.send(
      new Get({ TableName: TableNames.account, Key: keys }),
    )
    return result.Item as SetupItem | undefined
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
    return result.Item as AccountItem | undefined
  }

  static async addSetups(id: string, setups: string[]) {
    const keys = AccountController.getKeys(id)
    const updateCommand = new Update({
      TableName: TableNames.account,
      Key: keys,
      UpdateExpression:
        `SET setups = list_append(if_not_exists(#setups,:empty), :setups)`,
      ExpressionAttributeValues: { ":empty": [], ":setups": [...setups] },
      ExpressionAttributeNames: { "#setups": "setups" },
    })
    const result = await docClient.send(
      updateCommand,
    )
  }

  static async getSetups(id: string) {
    const account = await AccountController.getAccount(id)
    if (!account) return
    const setupTx = []
    for (const sid of account.setups) {
      setupTx.push(MultisigController.getSetup(sid))
    }
    const setups = await Promise.all(setupTx)
    return setups.filter((setup) => setup)
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
