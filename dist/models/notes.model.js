"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesModel = void 0;
const harpee_1 = require("harpee");
const config_1 = require("../config");
const { Model, Schema } = harpee_1.harpee;
const db_1 = require("../config/db");
const utils_1 = require("../utils");
(0, db_1.connectDB)();
const notesSchema = new Schema({
    name: config_1.envConfig.db_schema || "NoteDem",
    fields: {
        title: harpee_1.HType.string(),
        content: harpee_1.HType.string(),
        user_id: harpee_1.HType.string().required(),
        created_at: harpee_1.HType.date().default(utils_1.Utils.currentTime.getTime()),
        updated_at: harpee_1.HType.date().default(utils_1.Utils.currentTime.getTime()),
        category: harpee_1.HType.string(),
    },
});
exports.NotesModel = new Model("notes", notesSchema);