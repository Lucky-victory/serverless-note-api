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
        email: harpee_1.HType.string().email().required(),
        verified: harpee_1.HType.bool().default(false),
        fullname: harpee_1.HType.string(),
        created_at: harpee_1.HType.date().default(utils_1.Utils.currentTime.getTime()),
        updated_at: harpee_1.HType.date().default(utils_1.Utils.currentTime.getTime()),
    },
});
exports.NotesModel = new Model("users", notesSchema);
