import { NotFoundError } from "../types/errors";
import { createExample, getAllExamples, getExampleById, updateExample, deleteExample } from "../database/example";

export interface CreateExampleRequest {
  name: string;
  age: number;
}

export interface UpdateExampleRequest {
  name?: string;
  age?: number;
}

export class ExampleController {
  // Create a new example
  static async create(data: CreateExampleRequest) {
    if (data.name === "test") {
      throw new NotFoundError("test");
    }

    const newExample = await createExample(data);
    if (!newExample) {
      throw new Error("Failed to create example");
    }

    return newExample;
  }

  // Get all examples
  static async getAll() {
    return await getAllExamples();
  }

  // Get example by ID
  static async getById(id: string) {
    const example = await getExampleById(id);

    if (!example) {
      throw new NotFoundError("Example not found");
    }

    return example;
  }

  // Update example by ID
  static async update(id: string, data: UpdateExampleRequest) {
    const updatedExample = await updateExample(id, data);

    if (!updatedExample) {
      throw new NotFoundError("Example not found");
    }

    return updatedExample;
  }

  // Delete example by ID
  static async delete(id: string) {
    const deleted = await deleteExample(id);

    if (!deleted) {
      throw new NotFoundError("Example not found");
    }

    return true;
  }
}
