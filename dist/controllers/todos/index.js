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
exports.TodosController = void 0;
const todos_model_1 = require("../../models/todos.model");
const utils_1 = require("../../utils");
const todo_1 = require("../todo");
class TodosController {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todosResponse = yield todos_model_1.TodosModel.find({
                    orderby: ["updated_at"],
                    order: "desc",
                    getAttributes: todo_1.TODO_FIELDS,
                });
                return todosResponse.data;
            }
            catch (_) { }
        });
    }
    static create(todo) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTodo = todo;
                // if the todo has items, add an id to each
                ((_a = newTodo.items) === null || _a === void 0 ? void 0 : _a.length)
                    ? newTodo.items.map((item) => {
                        item.id = `item_${utils_1.Utils.generateID(false)}`;
                        return item;
                    })
                    : null;
                const todoCreateResponse = yield todos_model_1.TodosModel.create(newTodo);
                const createdTodoID = (_b = todoCreateResponse.data) === null || _b === void 0 ? void 0 : _b.inserted_hashes[0];
                const createdTodo = yield todos_model_1.TodosModel.findOne({
                    id: createdTodoID,
                }, todo_1.TODO_FIELDS);
                return createdTodo.data;
            }
            catch (_) { }
        });
    }
}
exports.TodosController = TodosController;
