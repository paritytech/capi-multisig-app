import { render } from "preact"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateMultisig } from "./pages/create-multisig.js"
import { Dashboard } from "./pages/dashboard.js"
import { PageError } from "./pages/error.js"
import "./index.css"

render(<Main />, document.getElementById("app")!)

function Main() {
  return <RouterProvider router={router} />
}

const router = createBrowserRouter([{
  path: "/",
  element: <Dashboard />,
  errorElement: <PageError />,
}, {
  path: "/create-multisig",
  element: <CreateMultisig />,
  errorElement: <PageError />,
}])
