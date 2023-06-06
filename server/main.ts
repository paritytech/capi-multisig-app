import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { router, createContext } from "./trpc.js";
import dotenv from "dotenv";

dotenv.config();

const server = createHTTPServer({
  router,
  createContext,
  middleware: cors(),
  batching: { enabled: true },
});

const PORT = parseInt(process.env.PORT ?? "5555");
server.listen(PORT);
console.log(`Listening on "http://localhost:${PORT}/"`);
