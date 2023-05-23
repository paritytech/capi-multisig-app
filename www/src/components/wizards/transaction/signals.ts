import { MultiAddress, Westend, westend } from "@capi/westend";
import { effect, Signal, signal } from "@preact/signals";
import { ExtrinsicRune, ss58 } from "capi";
import { defaultAccount } from "../../../signals/index.js";
import { transactionData } from "./formData.js";

export const selectedAccount = signal(defaultAccount.value);
export const call = signal<ExtrinsicRune<Westend, never> | undefined>(undefined);
export const fee: Signal<bigint> = signal(0n);

effect(() => {
  if (!transactionData.value.to) return;
  const addressPubKey = ss58.decode(transactionData.value.to)[1];
  call.value = westend.Balances.transferKeepAlive({
    value: BigInt(transactionData.value.amount),
    dest: MultiAddress.Id(addressPubKey),
  });
});

effect(() => {
  call.value
    ?.estimate()
    .run()
    .then((estimate: bigint) => {
      fee.value = estimate;
    });
});
