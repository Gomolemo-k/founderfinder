// drizzle.ts
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";

export const db = drizzle(process.env.DB, { schema });
