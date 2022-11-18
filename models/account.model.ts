import { harpee, HType } from "harpee";
import { envConfig } from "../config";
const { Model, Schema } = harpee;

import { connectDB } from "../config/db";
import { Utils } from "../utils";

connectDB();
const accountSchema = new Schema({
  name: envConfig.db_schema || "NoteApp",
  fields: {
    user_id: HType.string().required(),
    provider: HType.string()
      .allow("google", "facebook", "github")
      .default("google"),
    created_at: HType.date().default(Utils.currentTime.getTime()),
    updated_at: HType.date().default(Utils.currentTime.getTime()),
  },
});

export const AccountsModel = new Model("accounts", accountSchema);
