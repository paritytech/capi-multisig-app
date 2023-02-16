import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required"),
})

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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
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
  )
}
