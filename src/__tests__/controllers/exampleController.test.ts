import { ExampleController } from "../../controllers/exampleController";
import { NotFoundError } from "../../types/errors";

// Mock the database functions
jest.mock("../../database/example", () => ({
  createExample: jest.fn(),
  getAllExamples: jest.fn(),
  getExampleById: jest.fn(),
  updateExample: jest.fn(),
  deleteExample: jest.fn(),
}));

import { createExample, getAllExamples, getExampleById, updateExample, deleteExample } from "../../database/example";

const mockCreateExample = createExample as jest.MockedFunction<typeof createExample>;
const mockGetAllExamples = getAllExamples as jest.MockedFunction<typeof getAllExamples>;
const mockGetExampleById = getExampleById as jest.MockedFunction<typeof getExampleById>;
const mockUpdateExample = updateExample as jest.MockedFunction<typeof updateExample>;
const mockDeleteExample = deleteExample as jest.MockedFunction<typeof deleteExample>;

describe("ExampleController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new example successfully", async () => {
      const mockData = { name: "John Doe", age: 30 };
      const mockResult = { id: "123", name: "John Doe", age: 30 };

      mockCreateExample.mockResolvedValue(mockResult);

      const result = await ExampleController.create(mockData);

      expect(mockCreateExample).toHaveBeenCalledWith(mockData);
      expect(result).toEqual(mockResult);
    });

    it("should throw NotFoundError when name is 'test'", async () => {
      const mockData = { name: "test", age: 25 };

      await expect(ExampleController.create(mockData)).rejects.toThrow(NotFoundError);
      expect(mockCreateExample).not.toHaveBeenCalled();
    });

    it("should throw error when creation fails", async () => {
      const mockData = { name: "Jane Doe", age: 28 };

      mockCreateExample.mockResolvedValue(undefined);

      await expect(ExampleController.create(mockData)).rejects.toThrow("Failed to create example");
    });
  });

  describe("getAll", () => {
    it("should return all examples", async () => {
      const mockExamples = [
        { id: "1", name: "John", age: 30 },
        { id: "2", name: "Jane", age: 25 },
      ];

      mockGetAllExamples.mockResolvedValue(mockExamples);

      const result = await ExampleController.getAll();

      expect(mockGetAllExamples).toHaveBeenCalled();
      expect(result).toEqual(mockExamples);
    });
  });

  describe("getById", () => {
    it("should return example by ID", async () => {
      const mockExample = { id: "123", name: "John Doe", age: 30 };

      mockGetExampleById.mockResolvedValue(mockExample);

      const result = await ExampleController.getById("123");

      expect(mockGetExampleById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockExample);
    });

    it("should throw NotFoundError when example not found", async () => {
      mockGetExampleById.mockResolvedValue(null);

      await expect(ExampleController.getById("999")).rejects.toThrow(NotFoundError);
      expect(mockGetExampleById).toHaveBeenCalledWith("999");
    });
  });

  describe("update", () => {
    it("should update example successfully", async () => {
      const mockUpdateData = { name: "Jane Doe" };
      const mockResult = { id: "123", name: "Jane Doe", age: 30 };

      mockUpdateExample.mockResolvedValue(mockResult);

      const result = await ExampleController.update("123", mockUpdateData);

      expect(mockUpdateExample).toHaveBeenCalledWith("123", mockUpdateData);
      expect(result).toEqual(mockResult);
    });

    it("should throw NotFoundError when example not found", async () => {
      const mockUpdateData = { age: 35 };

      mockUpdateExample.mockResolvedValue(null);

      await expect(ExampleController.update("999", mockUpdateData)).rejects.toThrow(NotFoundError);
      expect(mockUpdateExample).toHaveBeenCalledWith("999", mockUpdateData);
    });
  });

  describe("delete", () => {
    it("should delete example successfully", async () => {
      mockDeleteExample.mockResolvedValue(true);

      const result = await ExampleController.delete("123");

      expect(mockDeleteExample).toHaveBeenCalledWith("123");
      expect(result).toBe(true);
    });

    it("should throw NotFoundError when example not found", async () => {
      mockDeleteExample.mockResolvedValue(false);

      await expect(ExampleController.delete("999")).rejects.toThrow(NotFoundError);
      expect(mockDeleteExample).toHaveBeenCalledWith("999");
    });
  });
});
