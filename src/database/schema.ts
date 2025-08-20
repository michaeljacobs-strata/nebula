import { integer, pgTable, text, uuid } from "drizzle-orm/pg-core";

const exampleTable = pgTable("example", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
});

export { exampleTable };
