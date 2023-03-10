import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { PORT, router } from "./index.js";
import { createServer } from "http";

const handler = createHTTPHandler({
  router,
  createContext() {
    // TODO: ddb utils here?
    return {};
  },
});

const server = createServer(handler);

server.listen(PORT);
