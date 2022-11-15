import { INote, INotePage } from "../../interfaces/note";
import { NotesModel } from "../../models/notes.model";
import { Utils } from "../../utils";

export class NoteController {
  static async get(id: string) {
    try {
      const noteResponse = await NotesModel.findOne<INote>({ id }, NOTE_FIELDS);
      const note = noteResponse.data;
      return note;
    } catch (_) {}
  }
  static async update(id: string, note: INote) {
    try {
      // if the note includes a property not specified in schema
      // then skip it;
      const noteToUpdate =
        Utils.pick(note, NotesModel.fields as (keyof INote)[]) || {};

      const updatedNoteResponse = await NotesModel.updateNested({
        id,
        path: ".",
        value: (data: INote) => {
          data.category = noteToUpdate?.category || data.category;
          data.pages = noteToUpdate?.pages || data.pages;
          data.title = noteToUpdate?.title || data.title;
          data.updated_at = Utils.currentTime.getTime();
          return data;
        },
        getAttributes: NOTE_FIELDS,
      });

      return updatedNoteResponse.data;
    } catch (_) {
      //
    }
  }
  static async updateTitle(id: string, title: string) {
    try {
      const updatedNoteResponse = await NotesModel.updateNested<INote>({
        id,
        path: ".title",
        value: (data: INote) => {
          data.title = title || data.title;
          data.updated_at = Utils.currentTime.getTime();
          return data.title;
        },
        getAttributes: NOTE_FIELDS,
      });

      return updatedNoteResponse.data;
    } catch (_) {
      //
    }
  }

  static async updatePages(id: string, page: INotePage) {
    try {
      const updatedNoteResponse = await NotesModel.updateNested({
        id,
        path: ".pages",
        value: (data: INote) => {
          if (page?.content && !page?.id) {
            data.pages.push({
              content: page?.content,
              id: `page_${Utils.generateID(false)}`,
            });
          }
          data.pages = data.pages.map((prevPage) => {
            return prevPage.id === page?.id ? page : prevPage;
          });
          data.updated_at = Utils.currentTime.getTime();
          return data.pages;
        },
        getAttributes: NOTE_FIELDS,
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

export const NOTE_FIELDS = NotesModel.fields;
