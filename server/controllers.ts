import type { Account, Setup } from "common"
import { $setup, u8aToHex } from "common"
import { Delete, docClient, Get, Put } from "./dynamoDB/db.js"
import { TableNames } from "./dynamoDB/table.js"

import { westend } from "@capi/westend"
import { Sr25519 } from "capi"
import {
  Multisig,
  multisigAccountId,
  MultisigRune,
} from "capi/patterns/multisig"

export class MultisigController {
  static getKeys(multisigId: string) {
    return { pk: multisigId }
  }
  static async createSetup(
    params: { payload: Setup; signature: Uint8Array },
  ) {
    const { payload, signature } = params

    // Validation
    const multisig = await MultisigRune.fromHex(westend, payload.multisigHex)
      .run()
    if (
      multisig.signatories.length < 2 || !multisig.threshold
      || multisig.threshold < 2
    ) {
      throw new Error("invalid multisig")
    }

    // ToDo: Authorization
    /*
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
    */

    // Put item in DB
    const multisigId = u8aToHex(
      multisigAccountId(multisig.signatories, multisig.threshold),
    )
    const keys = MultisigController.getKeys(multisigId)
    const setupItem = { ...keys, ...payload }
    console.log(setupItem)
    await docClient.send(
      new Put({
        TableName: TableNames.multisig,
        Item: setupItem,
      }),
    )
  }

  static async getSetup(multisigId: string) {
    const keys = MultisigController.getKeys(multisigId)
    const result = await docClient.send(
      new Get({ TableName: TableNames.account, Key: keys }),
    )
    return result.Item
  }

  static async deleteSetup(multisigId: string) {
    const keys = MultisigController.getKeys(multisigId)
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
