import { render } from "preact"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateMultisig } from "./pages/create-multisig.js"
import { Dashboard } from "./pages/dashboard.js"
import { PageError } from "./pages/error.js"
import "./index.css"

const errorElement = <PageError />

const router = createBrowserRouter([{
  path: "/",
  element: <Dashboard />,
  errorElement,
}, {
  path: "/create-multisig",
  element: <CreateMultisig />,
  errorElement,
}])

const Main = () => <RouterProvider router={router} />
render(<Main />, document.getElementById("app") as HTMLElement)
