"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDB = void 0;
const notes_model_1 = require("../models/notes.model");
const todos_model_1 = require("../models/todos.model");
function initializeDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield notes_model_1.NotesModel.init();
            yield todos_model_1.TodosModel.init();
            console.log("Database initialized successfully");
        }
        catch (_a) {
            console.log("Error: couldn't initialize database, please check your config");
        }
    });
}
exports.initializeDB = initializeDB;
initializeDB();
