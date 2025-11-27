import {
  pgTable,
  varchar,
  text,
  timestamp,
  integer,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const members = pgTable(
  "members",
  {
    id: varchar("id", { length: 128 })
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    code: varchar("code", { length: 128 }).notNull().unique(),
    barcode: text("barcode").notNull(),
    photo: text("photo").notNull(),
    card: text("card").notNull(),
    createdAt: timestamp("created_at", { precision: 6, mode: "date" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at", { precision: 6, mode: "date" })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdateFn(() => new Date()),
    version: integer("version").notNull().default(0),
  },
  (table) => [
    uniqueIndex("members_id_version_unique").on(table.id, table.version),
  ]
);

export type Member = typeof members.$inferSelect;
export type MemberCreateInput = typeof members.$inferInsert;
export type MemberUpdateInput = Partial<MemberCreateInput> & {
  version: number;
};
