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
const todos_1 = require("../../controllers/todos");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const method = req.method;
    switch (method) {
        case "GET":
            try {
                const todos = yield todos_1.TodosController.getAll();
                res.status(200).json({
                    body: `main route all`,
                    message: "Todos retrieved successfully",
                    data: todos,
                    count: todos === null || todos === void 0 ? void 0 : todos.length,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "An error occurred, couldn't retrieve todos",
                    error: err,
                });
            }
        case "POST":
            try {
                const newTodo = req.body;
                console.log(newTodo);
                const todo = yield todos_1.TodosController.create(Object.assign({ user_id: "1" }, newTodo));
                res.status(200).json({
                    body: `main route create`,
                    message: "Todo created successfully",
                    data: todo,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "An error occurred, couldn't create todo",
                    error: err,
                });
            }
    }
});
