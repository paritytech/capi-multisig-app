import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export type router = typeof router;
export const router = t.router({
  something: t.procedure
    .input((val: unknown) => {
      if (typeof val !== "string") throw new Error();
      return val;
    })
    .query((req) => {
      const { input } = req;
      console.log(input);
      return input;
    }),
});

export const PORT = 3210;
