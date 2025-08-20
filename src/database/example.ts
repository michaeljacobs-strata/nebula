import { eq } from "drizzle-orm";
import { exampleTable } from "./schema";
import { db } from "./connection";

export interface CreateExampleData {
  name: string;
  age: number;
}

export interface ExampleData extends CreateExampleData {
  id: string;
}

// Create a new example record
export async function createExample(data: CreateExampleData): Promise<ExampleData | undefined> {
  const [result] = await db.insert(exampleTable).values(data).returning();
  return result;
}

// Get all examples
export async function getAllExamples(): Promise<ExampleData[]> {
  return await db.select().from(exampleTable);
}

// Get example by ID
export async function getExampleById(id: string): Promise<ExampleData | null> {
  const [result] = await db.select().from(exampleTable).where(eq(exampleTable.id, id));
  return result || null;
}

// Update example by ID
export async function updateExample(id: string, data: Partial<CreateExampleData>): Promise<ExampleData | null> {
  const [result] = await db.update(exampleTable).set(data).where(eq(exampleTable.id, id)).returning();
  return result || null;
}

// Delete example by ID
export async function deleteExample(id: string): Promise<boolean> {
  const [result] = await db.delete(exampleTable).where(eq(exampleTable.id, id)).returning();
  return result !== undefined;
}

// Search examples by name
export async function searchExamplesByName(name: string): Promise<ExampleData[]> {
  return await db.select().from(exampleTable).where(eq(exampleTable.name, name));
}
