import { NotesModel } from "../../models/notes.model";
import { Utils } from "../../utils";

export class NoteController {
  static async get(id: string) {
    try {
      const noteResponse = await NotesModel.findOne({ id }, GET_ATTRIBUTES);
      const note = noteResponse.data;
      return note;
    } catch (_) {
      //
    }
  }
  static async update(id: string, note: any) {
    try {
      const updatedNoteResponse = await NotesModel.updateNested({
        id,
        path: "",
        value: (data: any) => {
          return {
            ...data,
            updated_at: Utils.currentTime.getTime(),
            ...note,
          };
        },
        getAttributes: GET_ATTRIBUTES,
        returnData: true,
      });
      return updatedNoteResponse.data;
    } catch (_) {
      //
    }
  }
  static async delete(id: string) {
    try {
      const noteResponse = await NotesModel.findAndRemove({ id });
      const note = noteResponse.data;
      return note;
    } catch (_) {
      //
    }
  }
}

export const GET_ATTRIBUTES = NotesModel.fields;
