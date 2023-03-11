import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export type router = typeof router;
export const router = t.router({
  something: t.procedure
    .input(z.object({
      greeting: z.string(),
      name: z.string(),
    }))
    .query((req) => {
      const { greeting, name } = req.input;
      console.log(greeting, name);
      return `${greeting} ${name}`;
    }),
});
