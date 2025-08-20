import fastify from "fastify";
import dotenv from "dotenv";
import health from "./routes/health";
import example from "./routes/example";
import { errorHandler } from "./middleware/errorHandler";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);

const server = fastify();

// Register global error handler
server.setErrorHandler(errorHandler);

server.register(health, { prefix: "/health" });
server.register(example, { prefix: "/example" });

server.listen({ port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on ${address.replace("[::1]", "localhost")}`);
});
