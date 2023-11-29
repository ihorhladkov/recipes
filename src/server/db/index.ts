import { env } from "~/env";
import { drizzle } from "drizzle-orm/node-postgres";
import { categories, recipes } from "./schema";
import { Pool } from 'pg';
import * as schema from './schema'


// const connectionString = env.DATABASE_URL;
// const client = postgres(connectionString);
// export const db = drizzle(client, { schema: { ...categories, ...recipes } });

const connectionString = env.DATABASE_URL ||  "";

const pool = new Pool({
  connectionString,
});
export const db = drizzle(pool, { schema });
