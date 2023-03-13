import { initTRPC } from "@trpc/server"
import * as $ from "scale-codec"

const t = initTRPC.create()

const $params = $.object(
  $.field("greeting", $.str),
  $.field("name", $.str),
)

export type router = typeof router
export const router = t.router({
  something: t.procedure
    .input((params) => {
      $.assert($params, params)
      return params
    })
    .query((req) => {
      const { greeting, name } = req.input
      console.log(greeting, name)
      return `${greeting} ${name}`
    }),
})
