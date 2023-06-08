import type { Account, Setup } from "common/models.js"
import { $setup } from "common/models.js"
import { Delete, docClient, Get, Put } from "./dynamoDB/db.js"
import { TableNames } from "./dynamoDB/table.js"

import { westend } from "@capi/westend"
import { Sr25519 } from "capi"
import { MultisigRune } from "capi/patterns/multisig"

export class MultisigController {
  static getKeys(multisigHex: string) {
    return { pk: multisigHex }
  }
  static async createSetup(
    params: { payload: Setup; signature: Uint8Array },
  ) {
    const { payload, signature } = params
    // Authorization
    const multisig = await MultisigRune.fromHex(westend, payload.multisigHex)
      .run()
    if (multisig.signatories.length < 2) {
      throw new Error("invalid multisig")
    }

    const isValidSignature = multisig.signatories
      .map((signatory: Uint8Array) =>
        Sr25519.verify(
          signatory,
          $setup.encode(payload),
          signature,
        )
      )
      .find((result: unknown) => result) ?? false

    if (!isValidSignature) {
      throw new Error("invalid signature")
    }

    // Put item in DB
    const keys = MultisigController.getKeys(payload.multisigHex)
    const setupItem = { ...keys, ...payload }
    await docClient.send(
      new Put({
        TableName: TableNames.multisig,
        Item: setupItem,
      }),
    )
  }

  static async getSetup(multisigHex: string) {
    const keys = AccountController.getKeys(multisigHex)
    const result = await docClient.send(
      new Get({ TableName: TableNames.account, Key: keys }),
    )
    return result.Item
  }

  static async deleteSetup(multisigHex: string) {
    const keys = AccountController.getKeys(multisigHex)
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
