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
const notes_1 = require("../../controllers/notes");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const method = req.method;
    switch (method) {
        case "GET":
            try {
                const { category } = req.query;
                if (!category) {
                    yield getUserNotes(req, res);
                    return;
                }
                yield getUserNotesByCategory(req, res);
            }
            catch (err) {
                res.status(500).json({
                    message: "An error occurred, couldn't retrieve notes",
                    error: err,
                });
            }
        case "POST":
            try {
                const newNote = req.body;
                const note = yield notes_1.NotesController.create(Object.assign({ user_id: "1" }, newNote));
                res.status(200).json({
                    body: `main route create`,
                    data: note,
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
const getUserNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { limit = 20, page = 1 } = req.query;
    limit = +limit;
    page = +page;
    const offset = (page - 1) * limit;
    const notesResponse = yield notes_1.NotesController.getAll("1", limit, offset);
    res.status(200).json({
        message: "Notes retrieved successfully",
        data: notesResponse,
        result_count: notesResponse === null || notesResponse === void 0 ? void 0 : notesResponse.length,
    });
});
const getUserNotesByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.query;
    const notesResponse = yield notes_1.NotesController.getByCategory(category);
    res.status(200).json({
        message: "Notes retrieved successfully",
        data: notesResponse,
        result_count: notesResponse === null || notesResponse === void 0 ? void 0 : notesResponse.length,
    });
});
