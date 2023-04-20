import { createHTTPServer } from "@trpc/server/adapters/standalone"
import cors from "cors"
import { router } from "./index.js"
import "dotenv"

const server = createHTTPServer({
  router,
  createContext() {
    // TODO
    return {}
  },
  middleware: cors(),
  batching: { enabled: true },
})

const PORT = 5000
server.listen(PORT)
console.log(`Listening on "http://localhost:${PORT}/"`)
