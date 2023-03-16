import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { render } from "preact"
import { useState } from "preact/hooks"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateMultisig } from "./pages/create-multisig.js"
import { Dashboard } from "./pages/dashboard.js"
import { NewTransaction } from "./pages/new-transaction.js"
import { PageError } from "./pages/error.js"
import { trpc } from "./trpc.js"
import "./index.css"

function Main() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `http://localhost:3210`,
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
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
])

render(<Main />, document.getElementById("app")!)
