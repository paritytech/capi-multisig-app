import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { render } from "preact"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { type router } from "server"
import { CreateMultisig } from "./pages/create-multisig.js"
import { Dashboard } from "./pages/dashboard.js"
import { PageError } from "./pages/error.js"
import "./index.css"
import { useState } from "preact/hooks"

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

render(<Main />, document.getElementById("app") as HTMLElement)

function Main() {
  const [queryClient] = useState(() => new QueryClient())
  const [client] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({ url: `http://localhost:3210/trpc` }),
      ],
    })
  )
  return (
    <trpc.Provider {...{ client, queryClient }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

const trpc = createTRPCReact<router>()
