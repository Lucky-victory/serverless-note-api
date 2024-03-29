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
          content: HType.string().allow(null),
        })
      )
      .default([]),
    content:HType.string().allow(null),
    user_id: HType.string().required(),
    created_at: HType.date().default(Utils.currentTime.getTime()),
    updated_at: HType.date().default(Utils.currentTime.getTime()),
    category: HType.string().allow(null),
    tags:HType.array().default([]),
    
        id:HType.string().default(Utils.baseUUID(30)),
  },
});

export const NotesModel = new Model("notes", notesSchema);
