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
exports.NOTE_FIELDS = exports.NoteController = void 0;
const notes_model_1 = require("../../models/notes.model");
const utils_1 = require("../../utils");
class NoteController {
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const noteResponse = yield notes_model_1.NotesModel.findOne({ id }, exports.NOTE_FIELDS);
                const note = noteResponse.data;
                return note;
            }
            catch (_) {
                //
            }
        });
    }
    static update(id, note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // if the note includes a property not specified in schema
                // then skip it;
                const noteToUpdate = utils_1.Utils.pick(note, notes_model_1.NotesModel.fields) || {};
                yield notes_model_1.NotesModel.update([
                    Object.assign(Object.assign({ id }, noteToUpdate), { updated_at: utils_1.Utils.currentTime.getTime() }),
                ]);
                const updatedNoteResponse = yield notes_model_1.NotesModel.findOne({
                    id,
                }, exports.NOTE_FIELDS);
                return updatedNoteResponse.data;
            }
            catch (_) {
                //
            }
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const noteResponse = yield notes_model_1.NotesModel.findAndRemove({ id });
                const note = noteResponse.data;
                return note;
            }
            catch (_) {
                //
            }
        });
    }
}
exports.NoteController = NoteController;
exports.NOTE_FIELDS = notes_model_1.NotesModel.fields;
