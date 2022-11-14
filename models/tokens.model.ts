import { harpee, HType } from "harpee";
import { envConfig } from "../config";
const { Model, Schema } = harpee;

import { connectDB } from "../config/db";
import { Utils } from "../utils";

connectDB();
const notesSchema = new Schema({
  name: envConfig.db_schema || "NoteApp",
  fields: {
    key: HType.string(),
    user_id: HType.string().required(),
    status: HType.string()
      .allow("active", "revoked", "expired")
      .default("active"),
    created_at: HType.date().default(Utils.currentTime.getTime()),
    updated_at: HType.date().default(Utils.currentTime.getTime()),
  },
});

export const NotesModel = new Model("tokens", notesSchema);
