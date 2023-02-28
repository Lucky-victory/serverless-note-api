import dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  db_host: process.env.DB_HOST as string,
  db_pass: process.env.DB_PASS as string,
  db_user: process.env.DB_USER as string,
  db_schema: process.env.DB_SCHEMA,
  google_client_id: process.env.GOOGLE_CLIENT_ID as string,
  is_dev: process.env.NODE_ENV !== "production",
  allowed_origins:
    process.env.ALLOWED_ORIGINS || (process.env.NODE_ENV !== "production"? "*" as string:''),
};
