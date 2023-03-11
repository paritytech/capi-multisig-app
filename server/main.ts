import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "./index.js";
import cors from "cors";

const server = createHTTPServer({
  router,
  createContext() {
    // TODO
    return {};
  },
  middleware: cors(),
  batching: { enabled: true },
});

const PORT = 3210;
server.listen(PORT);
console.log(`Listening on "http://localhost:${PORT}/"`);
