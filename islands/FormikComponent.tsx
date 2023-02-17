// https://github.com/denoland/fresh/issues/1035

// https://deno.land/manual@v1.30.3/node/cdns
// https://deno.land/manual@v1.30.3/node/npm_specifiers

// import { ErrorMessage, Field, Form, Formik } from "formik"
// import {
//   ErrorMessage,
//   Field,
//   Form,
//   Formik,
// } from "https://esm.sh/formik@2.2.9?alias=react:preact/compat&deps=preact@10.5.14"
// import { ErrorMessage, Field, Form, Formik } from "https://esm.sh/formik@2.2.9?external=react"
// import { ErrorMessage, Field, Form, Formik } from "https://esm.sh/formik@2.2.9"
// import { ErrorMessage, Field, Form, Formik } from "npm:formik@2.2.9"
import { ErrorMessage, Field, Form, Formik } from "https://cdn.skypack.dev/formik"

// ----- Schema -----
// import * as Yup from "https://cdn.skypack.dev/yup"

// const schema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   message: Yup.string().required("Message is required"),
// })

const initialValues = {
  name: "",
  email: "",
  message: "",
}

const onSubmit = (values, { setSubmitting }) => {
  console.log(values)
  setSubmitting(false)
}

export default function FormikComponent() {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={schema}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <Field as="textarea" name="message" />
              <ErrorMessage name="message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
