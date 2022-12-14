import { harpee, HType } from "harpee";
import { envConfig } from "../config";
const { Model, Schema } = harpee;

import { connectDB } from "../config/db";
import { Utils } from "../utils";

connectDB();
const notesSchema = new Schema({
  name: envConfig.db_schema || "NoteApp",
  fields: {
    title: HType.string(),
    pages: HType.array()
      .items(
        HType.object({
          id: HType.string(),
          content: HType.string().allow(""),
        })
      )
      .default([]),
    content:HType.string().allow(''),
    user_id: HType.string().required(),
    created_at: HType.date().default(Utils.currentTime.getTime()),
    updated_at: HType.date().default(Utils.currentTime.getTime()),
    category: HType.string(),
    tags:HType.array().default([]),
  },
});

export const NotesModel = new Model("notes", notesSchema);
