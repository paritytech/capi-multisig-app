import { System, Balances } from "@capi/westend";
import { MultiAddress } from "@capi/westend/types/sp_runtime/multiaddress.js";
import { ss58 } from "capi";

export async function getBalance(address: string) {
  const addressPubKey = ss58.decode(address)[1];

  const balance = await System.Account.value(addressPubKey).run();

  return balance ? balance.data.free : 0;
}

export async function getFeeEstimate({
  amount,
  address,
}: {
  amount: bigint;
  address: string;
}): Promise<{
  weight: {
    proofSize: bigint;
    refTime: bigint;
  };
  class: "normal" | "operational" | "mandatory";
  partialFee: number;
}> {
  const [_prefix, decodedAddress] = ss58.decode(address);

  const fee = await Balances.transfer({
    value: amount,
    dest: MultiAddress.Id(decodedAddress),
  })
    .feeEstimate()
    .run();

  return fee;
}
