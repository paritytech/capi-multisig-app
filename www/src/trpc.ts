import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { type router } from "server";

export const trpc = createTRPCProxyClient<router>({
  links: [httpBatchLink({
    url: `http://localhost:3210/trpc`,
  })],
});
