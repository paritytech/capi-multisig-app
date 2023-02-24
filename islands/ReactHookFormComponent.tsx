// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?alias=react:preact/compat&deps=preact@10.5.14"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1"
// import { useForm } from "react-hook-form"
import { zodResolver } from "https://esm.sh/@hookform/resolvers@2.9.11/zod"
import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom"
// import * as yup from "https://esm.sh/yup@1.0.0"
import { ss58 } from "capi"
import * as z from "https://esm.sh/zod@3.20.6"

import { putAccount } from "../misc/putAccount.ts"

// https://polkadot.js.org/docs/util-crypto/examples/validate-address
const encodeAddress = (address) => ss58.decode(address)[1]
const decodeAddress = (address) => ss58.encode(42, address)
const isValidAddressPolkadotAddress = (address) => {
  try {
    decodeAddress(encodeAddress(address))
    return true
  } catch (error) {
    return false
  }
}

// const schema = yup
//   .object({
//     name: yup.string().required(),
//     age: yup.number().positive().integer().required(),
//   })
//   .required()

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
  address: z.string({}).refine(isValidAddressPolkadotAddress, {
    message: "Invalid polkadot address",
  }),
})

export default function ReactHookFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data, event) => {
    event.preventDefault()
    console.log(data)
    const address = data.address
    // putAccount({ pk: account.address, sk: `real#${account.address}` })
    putAccount({ pk: address, sk: `real#${address}` })
  }

  return (
    <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
      <label>Name:</label>
      <input {...register("name")} />
      <p>{errors.name?.message}</p>

      <label>Age:</label>
      <input type="number" {...register("age", { valueAsNumber: true })} />
      <p>{errors.age?.message}</p>

      <label>Address:</label>
      <input {...register("address")} />
      <p>{errors.address?.message}</p>

      <input type="submit" />
    </form>
  )
}
