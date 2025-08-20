import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Get database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Create postgres pool
const pool = new Pool({
  connectionString: databaseUrl,
});

// Create drizzle instance
export const db = drizzle(pool, { schema });

// Export the pool for manual operations if needed
export { pool };
