import { NotesModel } from "../../models/notes.model";

export class NoteController {
  static async get(id: string) {
    try {
      const noteResponse = await NotesModel.findOne({ id });
      const note = noteResponse.data;
      return note;
    } catch (_) {
      //
    }
  }
  static async update(id: string, note: any) {
    try {
    } catch (_) {
      //
    }
  }
  static async delete(id: string) {}
}
