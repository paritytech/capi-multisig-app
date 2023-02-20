// https://github.com/denoland/fresh/issues/1035
// import { ErrorMessage, Field, Form, Formik } from "formik"
// import {
//   ErrorMessage,
//   Field,
//   Form,
//   Formik,
// } from "https://esm.sh/formik@2.2.9?alias=react:preact/compat&deps=preact@10.5.14"
// import { ErrorMessage, Field, Form, Formik } from "https://esm.sh/formik@2.2.9?external=react"
// import { ErrorMessage, Field, Form, Formik } from "https://esm.sh/formik@2.2.9";
// import { ErrorMessage, Field, Form, Formik } from "npm:formik@2.2.9"
import { ErrorMessage, Field, Form, Formik } from "https://cdn.skypack.dev/formik";
// import {
//   Field,
//   Form,
//   Formik,
// } from "https://esm.sh/formik@2.2.9?external=react,react-dom,@types/react,@types/react-dom";

export default function FormikComponent() {
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="Jane" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="jane@acme.com" type="email" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
