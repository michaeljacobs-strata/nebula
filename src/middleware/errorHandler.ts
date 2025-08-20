import {
  FastifyError,
  FastifyReply,
  FastifyRequest,
  FastifySchemaValidationError,
} from "fastify";
import { NotFoundError } from "../types/errors";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  console.log(error);
  if (error.code === "FST_ERR_VALIDATION") {
    if (error.validation) {
      return reply.status(400).send({
        message: "Validation Error",
        instancePath: error.validation[0]?.instancePath,
        validation_error: error.validation[0]?.message,
      });
    }
    return reply.status(400).send({
      message: "Validation Error",
      validation_error: "Unknown validation error",
    });
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      message: "Not Found",
      error: error.message,
    });
  }

  return reply.status(500).send({
    message: "Internal Server Error",
    error: error.message,
  });
}
