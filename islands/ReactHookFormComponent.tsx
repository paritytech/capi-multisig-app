// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?alias=react:preact/compat&deps=preact@10.5.14"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1"
// import { useForm } from "react-hook-form"
import { zodResolver } from "https://esm.sh/@hookform/resolvers@2.9.11/zod"
import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom"
// import * as yup from "https://esm.sh/yup@1.0.0"
import * as z from "https://esm.sh/zod@3.20.6"

// const schema = yup
//   .object({
//     firstName: yup.string().required(),
//     age: yup.number().positive().integer().required(),
//   })
//   .required()

const schema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
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
  }

  return (
    <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input type="number" {...register("age", { valueAsNumber: true })} />
      <p>{errors.age?.message}</p>

      <input type="submit" />
    </form>
  )
}
