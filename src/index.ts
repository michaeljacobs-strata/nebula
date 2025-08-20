import fastify from "fastify";
import dotenv from "dotenv";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import health from "./routes/health";
import example from "./routes/example";
import { errorHandler } from "./middleware/errorHandler";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle(process.env.DATABASE_URL!);

const server = fastify();

// Register global error handler
server.setErrorHandler(errorHandler);

// Register Swagger for OpenAPI documentation
server.register(swagger, {
  swagger: {
    info: {
      title: "Nebula API",
      description: "REST API template for services within Mailtech",
      version: "1.0.0",
    },
    host: `localhost:${process.env.PORT || 8080}`,
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

// Register Swagger UI
server.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "list",
    deepLinking: true,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

server.register(health, { prefix: "/health" });
server.register(example, { prefix: "/example" });

server.listen({ port: Number(process.env.PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on ${address.replace("[::1]", "localhost")}`);
});
