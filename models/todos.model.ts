import { harpee, HType } from "harpee";
import { envConfig } from "../config";
const { Model, Schema } = harpee;

import { connectDB } from "../config/db";
import { Utils } from "../utils";

connectDB();
const todosSchema = new Schema({
  name: envConfig.db_schema || "NoteApp",
  fields: {
    title: HType.string(),
    items: HType.array()
      .items(
        HType.object({
          id: HType.string().required(),
          content: HType.string().required(),
          completed: HType.bool().default(false),
        })
      )
      .default([]),
    user_id: HType.string().required(),
    created_at: HType.date().default(Utils.currentTime.getTime()),
    updated_at: HType.date().default(Utils.currentTime.getTime()),
    
        id:HType.string().default(Utils.baseUUID(30)),
  },
});

export const TodosModel = new Model("todos", todosSchema);
