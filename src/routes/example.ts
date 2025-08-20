import { FastifyInstance } from "fastify";
import { ExampleController } from "../controllers/exampleController";

export default async function (fastify: FastifyInstance) {
  // Create a new example
  fastify.post<{ Body: { name: string; age: number } }>(
    "/",
    {
      schema: {
        body: {
          type: "object",
          properties: { name: { type: "string" }, age: { type: "number" } },
          required: ["name", "age"],
          additionalProperties: false,
        },
      },
    },
    async (req, res) => {
      try {
        const result = await ExampleController.create(req.body);
        res.status(201).send(result);
      } catch (error) {
        throw error;
      }
    },
  );

  // Get all examples
  fastify.get("/", async (req, res) => {
    try {
      const result = await ExampleController.getAll();
      res.send(result);
    } catch (error) {
      throw error;
    }
  });

  // Get example by ID
  fastify.get<{ Params: { id: string } }>("/:id", async (req, res) => {
    try {
      const result = await ExampleController.getById(req.params.id);
      res.send(result);
    } catch (error) {
      throw error;
    }
  });

  // Update example by ID
  fastify.put<{ Params: { id: string }; Body: { name?: string; age?: number } }>(
    "/:id",
    {
      schema: {
        body: {
          type: "object",
          properties: { name: { type: "string" }, age: { type: "number" } },
          additionalProperties: false,
        },
      },
    },
    async (req, res) => {
      try {
        const result = await ExampleController.update(req.params.id, req.body);
        res.send(result);
      } catch (error) {
        throw error;
      }
    },
  );

  // Delete example by ID
  fastify.delete<{ Params: { id: string } }>("/:id", async (req, res) => {
    try {
      await ExampleController.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      throw error;
    }
  });
}
