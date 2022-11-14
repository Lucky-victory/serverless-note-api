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
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const method = req.method;
    switch (method) {
        case "GET":
            try {
                const { id } = req.query;
                const note = yield note_1.NoteController.get(id);
                if (!note) {
                    res.status(404).json({
                        message: `Note with id '${id}' does not exist`,
                    });
                    return;
                }
                res.status(200).json({
                    data: note,
                    message: "Note retrieved successfully",
                });
            }
            catch (_) { }
        case "PUT":
            try {
                const noteToUpdate = req.body;
                const { id } = req.query;
                const note = yield note_1.NoteController.get(id);
                if (!note) {
                    res.status(404).json({
                        message: `Note with id '${id}' does not exist`,
                    });
                    return;
                }
                const updatedNote = yield note_1.NoteController.update(id, noteToUpdate);
                res.status(200).json({
                    message: "Note updated successfully",
                    data: updatedNote,
                });
            }
            catch (_) { }
        case "DELETE":
            try {
                const { id } = req.query;
                const note = yield note_1.NoteController.get(id);
                if (!note) {
                    res.status(404).json({
                        message: `Note with id '${id}' does not exist`,
                    });
                    return;
                }
                yield note_1.NoteController.delete(id);
                res.status(200).json({
                    message: "Note deleted successfully",
                });
            }
            catch (_) { }
    }
});
