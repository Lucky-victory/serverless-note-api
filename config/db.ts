import { harpee } from "harpee";
import { envConfig } from ".";

export const connectDB = () =>
  harpee.createConnection({
    host: envConfig.db_host,
    pass: envConfig.db_pass,
    user: envConfig.db_user,
  });
