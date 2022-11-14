import { INote } from "../../interfaces/note";
import { NotesModel } from "../../models/notes.model";
import { Utils } from "../../utils";

export class NoteController {
  static async get(id: string) {
    try {
      const noteResponse = await NotesModel.findOne<INote>({ id }, NOTE_FIELDS);
      const note = noteResponse.data;
      return note;
    } catch (_) {
      //
    }
  }
  static async update(id: string, note: INote) {
    try {
      // if the note includes a property not specified in schema
      // then skip it;
      const noteToUpdate =
        Utils.pick(note, NotesModel.fields as (keyof INote)[]) || {};

      await NotesModel.update([
        {
          id,
          ...noteToUpdate,
          updated_at: Utils.currentTime.getTime(),
        },
      ]);
      const updatedNoteResponse = await NotesModel.findOne<INote>(
        {
          id,
        },
        NOTE_FIELDS
      );
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

export const NOTE_FIELDS = NotesModel.fields;
