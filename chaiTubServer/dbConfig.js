import pg from "pg";
import env from "dotenv";
// import postgres from "postgres";
// import { createClient } from "@supabase/supabase-js";

// Load environment variables
env.config();

const connectionString = process.env.SUPABASE_DB_URL;
// const pool = postgres(connectionString);
const pool = new pg.Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Supabase DB
// const supabaseUrl = process.env.VITE_SUPABASE_URL;
// const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
// const pool = createClient(supabaseUrl, supabaseKey);

// Create database connection pool
// const pool = new pg.Pool({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });

export default pool;
