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
exports.NotesController = void 0;
const notes_model_1 = require("../../models/notes.model");
const utils_1 = require("../../utils");
class NotesController {
    static create(newNote) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createResponse = yield notes_model_1.NotesModel.create(newNote);
                const createdNoteId = (_a = createResponse.data) === null || _a === void 0 ? void 0 : _a.inserted_hashes[0];
                return createdNoteId;
            }
            catch (_) {
                //
            }
        });
    }
    static getAll(userId, limit = 20, offset = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notesResponse = yield notes_model_1.NotesModel.findByConditions({
                    limit,
                    offset,
                    conditions: [
                        {
                            search_attribute: "user_id",
                            search_value: userId,
                            search_type: "equals",
                        },
                    ],
                });
                return utils_1.Utils.sortBy(notesResponse.data);
            }
            catch (_) { }
        });
    }
}
exports.NotesController = NotesController;
