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
                res.status(200).json({
                    data: note,
                    message: "Note retrieved successfully",
                });
            }
            catch (_) { }
        case "PUT":
            try {
                const note = req.body;
                const { id } = req.query;
                const updatedNote = yield note_1.NoteController.update(id, note);
                res.status(200).json({
                    body: `you requested for ${req.query.id} updated`,
                    query: req.query,
                    data: updatedNote,
                });
            }
            catch (_) { }
        case "DELETE":
            try {
                const { id } = req.query;
                yield note_1.NoteController.delete(id);
                res.status(200).json({
                    body: `you requested for ${req.query.id} updated`,
                    query: req.query,
                });
            }
            catch (_) { }
    }
});
