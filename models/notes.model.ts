import { harpee, HType } from "harpee";
import { envConfig } from "../config";
const { Model, Schema } = harpee;

import { connectDB } from "../config/db";
import { Utils } from "../utils";

connectDB();
const notesSchema = new Schema({
  name: envConfig.db_schema || "NoteDem",
  fields: {
    title: HType.string(),
    content: HType.string(),
    user_id: HType.string().required(),
    created_at: HType.date().default(Utils.currentTime.getTime()),
    updated_at: HType.date().default(Utils.currentTime.getTime()),
    category: HType.string(),
  },
});

export const NotesModel = new Model("notes", notesSchema);
