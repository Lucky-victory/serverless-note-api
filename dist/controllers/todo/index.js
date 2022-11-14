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
exports.TODO_FIELDS = exports.TodoController = void 0;
const todos_model_1 = require("../../models/todos.model");
const utils_1 = require("../../utils");
class TodoController {
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todoResponse = yield todos_model_1.TodosModel.findOne({ id }, exports.TODO_FIELDS);
                return todoResponse.data;
            }
            catch (_) { }
        });
    }
    static updateTitle(todoId, title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTodoResponse = yield todos_model_1.TodosModel.updateNested({
                    id: todoId,
                    path: ".title",
                    value: (data) => {
                        data.updated_at = utils_1.Utils.currentTime.getTime();
                        data.title = title || data.title;
                        return data.title;
                    },
                    getAttributes: exports.TODO_FIELDS,
                });
                return updatedTodoResponse.data;
            }
            catch (_) { }
        });
    }
    static updatedItems(todoId, todoItem) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTodoResponse = yield todos_model_1.TodosModel.updateNested({
                    id: todoId,
                    path: ".",
                    value: (data) => {
                        if (!(todoItem === null || todoItem === void 0 ? void 0 : todoItem.id)) {
                            data.items.push({
                                content: todoItem === null || todoItem === void 0 ? void 0 : todoItem.content,
                                id: `item_${utils_1.Utils.generateID(false)}`,
                            });
                        }
                        data.items.map((prevItem) => {
                            prevItem.id === todoItem.id ? todoItem : prevItem;
                        });
                        data.updated_at = utils_1.Utils.currentTime.getTime();
                        return data;
                    },
                    getAttributes: exports.TODO_FIELDS,
                });
                return updatedTodoResponse.data;
            }
            catch (_) { }
        });
    }
    static update(todoId, todoToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTodoResponse = yield todos_model_1.TodosModel.updateNested({
                    id: todoId,
                    path: ".",
                    value: (data) => {
                        data.title = (todoToUpdate === null || todoToUpdate === void 0 ? void 0 : todoToUpdate.title) || data.title;
                        data.items = (todoToUpdate === null || todoToUpdate === void 0 ? void 0 : todoToUpdate.items) || data.items;
                        data.updated_at = utils_1.Utils.currentTime.getTime();
                        return data;
                    },
                    getAttributes: exports.TODO_FIELDS,
                });
                return updatedTodoResponse.data;
            }
            catch (_) { }
        });
    }
    static delete(todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield todos_model_1.TodosModel.findByIdAndRemove([todoId]);
            }
            catch (_) { }
        });
    }
}
exports.TodoController = TodoController;
exports.TODO_FIELDS = todos_model_1.TodosModel.fields;
