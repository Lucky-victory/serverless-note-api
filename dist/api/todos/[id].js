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
const todo_1 = require("../../controllers/todo");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const method = req.method;
    switch (method) {
        case "GET":
            try {
                const { id } = req.query;
                const todo = yield todo_1.TodoController.get(id);
                if (!todo) {
                    res.status(404).json({
                        message: `Todo with id '${id}' does not exist`,
                    });
                    return;
                }
                res.status(200).json({
                    data: todo,
                    message: "Todo retrieved successfully",
                });
            }
            catch (_) { }
        case "PUT":
            try {
                const todoToUpdate = req.body;
                const { id, part } = req.query;
                const todo = yield todo_1.TodoController.get(id);
                if (!todo) {
                    res.status(404).json({
                        message: `Todo with id '${id}' does not exist`,
                    });
                    return;
                }
                let updatedTodo;
                if (part === 'title') {
                    updatedTodo = (yield todo_1.TodoController.updateTitle(id, todoToUpdate));
                }
                else {
                    updatedTodo = (yield todo_1.TodoController.updatedItem(id, todoToUpdate));
                }
                res.status(200).json({
                    message: "Todo updated successfully",
                    data: updatedTodo,
                });
            }
            catch (_) { }
        case "DELETE":
            try {
                const { id } = req.query;
                const todo = yield todo_1.TodoController.get(id);
                if (!todo) {
                    res.status(404).json({
                        message: `Todo with id '${id}' does not exist`,
                    });
                    return;
                }
                yield todo_1.TodoController.delete(id);
                res.status(200).json({
                    message: "Todo deleted successfully",
                });
            }
            catch (_) { }
    }
});
