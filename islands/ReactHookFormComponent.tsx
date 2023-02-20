// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?alias=react:preact/compat&deps=preact@10.5.14"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom"
// import { useForm } from "https://esm.sh/react-hook-form@7.43.1"
// import { useForm } from "react-hook-form"
import { yupResolver } from "https://esm.sh/@hookform/resolvers@2.9.11/yup";
import { useForm } from "https://esm.sh/react-hook-form@7.43.1?external=react,react-dom,@types/react,@types/react-dom";
import * as yup from "https://esm.sh/yup@1.0.0";

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

export default function ReactHookFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form className="m-5" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      <input {...register("age")} />
      <p>{errors.age?.message}</p>

      <input type="submit" />
    </form>
  );
}
