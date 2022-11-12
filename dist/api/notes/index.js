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
const note_1 = require("../../controllers/note");
const notes_1 = require("../../controllers/notes");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const method = req.method;
    switch (method) {
        case "GET":
            try {
                let { limit = 20, page = 1 } = req.query;
                limit = +limit;
                page = +page;
                const offset = (page - 1) * limit;
                const notesResponse = yield notes_1.NotesController.getAll("1", limit, offset);
                res.status(200).json({
                    body: `main route updated`,
                    query: req.query,
                    data: notesResponse,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "An error occurred, couldn't retrieve notes",
                    error: err,
                });
            }
        case "POST":
            try {
                const notesResponse = (yield notes_1.NotesController.create({
                    user_id: "1",
                    title: "my user note",
                    category: "junks",
                }));
                const note = yield note_1.NoteController.get(notesResponse);
                res.status(200).json({
                    body: `main route create`,
                    query: req.query,
                    data: note,
                    res: notesResponse,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "An error occurred, couldn't create note",
                    error: err,
                });
            }
    }
});
