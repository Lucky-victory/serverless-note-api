"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosModel = void 0;
const harpee_1 = require("harpee");
const config_1 = require("../config");
const { Model, Schema } = harpee_1.harpee;
const db_1 = require("../config/db");
const utils_1 = require("../utils");
(0, db_1.connectDB)();
const todosSchema = new Schema({
    name: config_1.envConfig.db_schema || "NoteDem",
    fields: {
        title: harpee_1.HType.string(),
        items: harpee_1.HType.array()
            .items(harpee_1.HType.object({
            id: harpee_1.HType.string().default(utils_1.Utils.generateID()),
            content: harpee_1.HType.string().required(),
            completed: harpee_1.HType.bool().default(false),
        }))
            .default([]),
        user_id: harpee_1.HType.string().required(),
        created_at: harpee_1.HType.date().default(utils_1.Utils.currentTime.getTime()),
        updated_at: harpee_1.HType.date().default(utils_1.Utils.currentTime.getTime()),
    },
});
exports.TodosModel = new Model("todos", todosSchema);
