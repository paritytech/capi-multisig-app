import { MultisigRune } from "capi/patterns/multisig";
import { toPubKey } from "../util/capi-helpers.js";
import { Westend, westend } from "@capi/westend";
import { ss58 } from "capi";

export async function getMultisigAddress(members: string[], threshold: number) {
  const signatories = members.map(toPubKey);
  const multisig: MultisigRune<Westend, never> = MultisigRune.from(westend, {
    signatories,
    threshold,
  });
  const [prefix, accountId] = await Promise.all([
    westend.addressPrefix().run(),
    multisig.accountId.run(),
  ]);

  return ss58.encode(prefix, accountId);
}
