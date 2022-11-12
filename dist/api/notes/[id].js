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
const notes_model_1 = require("../../models/notes.model");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield notes_model_1.NotesModel.create({
        id: req.query.id,
        title: "My first note",
    });
    res.status(200).json({
        body: `you requested for ${req.query.id} updated`,
        query: req.query,
    });
});
