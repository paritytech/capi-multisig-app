import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "preact"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import { CreateMultisig } from "./pages/create-multisig.js"
import { Dashboard } from "./pages/dashboard.js"
import { PageError } from "./pages/error.js"
import { Multisig } from "./pages/multisig.js"
import { NewTransaction } from "./pages/new-transaction.js"

const queryClient = new QueryClient()
function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <PageError />,
  },
  {
    path: "/create-multisig",
    element: <CreateMultisig />,
    errorElement: <PageError />,
  },
  {
    path: "/new-transaction",
    element: <NewTransaction />,
    errorElement: <PageError />,
  },
  {
    path: "/multisig/:multisigId",
    element: <Multisig />,
    errorElement: <PageError />,
  },
])

render(<Main />, document.getElementById("app")!)
