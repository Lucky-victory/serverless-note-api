import { harpee, HType } from "harpee";
import { envConfig } from "../config";
const { Model, Schema } = harpee;

import { connectDB } from "../config/db";
import { Utils } from "../utils";

connectDB();
const usersSchema = new Schema({
  name: envConfig.db_schema || "NoteApp",
  fields: {
    email: HType.string().email().required(),
    verified: HType.bool().default(false),
    fullname: HType.string(),
    first_name: HType.string(),
    last_name: HType.string(),
    password: HType.string(),
    profile_image: HType.string(),
    created_at: HType.date().default(Utils.currentTime.getTime()),
    updated_at: HType.date().default(Utils.currentTime.getTime()),
  },
});

export const UsersModel = new Model("users", usersSchema);
