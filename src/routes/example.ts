import { FastifyInstance } from "fastify";
import { ExampleController } from "../controllers/exampleController";

export default async function (fastify: FastifyInstance) {
  // Create a new example
  fastify.post<{ Body: { name: string; age: number } }>(
    "/",
    {
      schema: {
        tags: ["example"],
        summary: "Create a new example",
        description: "Creates a new example record with name and age",
        body: {
          type: "object",
          properties: {
            name: { type: "string", description: "The name of the example" },
            age: { type: "number", description: "The age of the example" },
          },
          required: ["name", "age"],
          additionalProperties: false,
        },
        response: {
          201: {
            description: "Example created successfully",
            type: "object",
            properties: {
              id: { type: "string", description: "Unique identifier" },
              name: { type: "string" },
              age: { type: "number" },
            },
          },
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
  fastify.get(
    "/",
    {
      schema: {
        tags: ["example"],
        summary: "Get all examples",
        description: "Retrieves all example records",
        response: {
          200: {
            description: "List of examples",
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                age: { type: "number" },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const result = await ExampleController.getAll();
        res.send(result);
      } catch (error) {
        throw error;
      }
    },
  );

  // Get example by ID
  fastify.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: {
        tags: ["example"],
        summary: "Get example by ID",
        description: "Retrieves a specific example by its unique identifier",
        params: {
          type: "object",
          properties: {
            id: { type: "string", description: "Unique identifier of the example" },
          },
          required: ["id"],
        },
        response: {
          200: {
            description: "Example found",
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              age: { type: "number" },
            },
          },
          404: {
            description: "Example not found",
            type: "object",
            properties: {
              message: { type: "string" },
              error: { type: "string" },
            },
          },
        },
      },
    },
    async (req, res) => {
      try {
        const result = await ExampleController.getById(req.params.id);
        res.send(result);
      } catch (error) {
        throw error;
      }
    },
  );

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
