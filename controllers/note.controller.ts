import { INote, INotePage } from "../interfaces/note";
import { NotesModel } from "../models/notes.model";
import { Utils } from "../utils";

export class NoteController {
  static async get(id: string, fields = NOTE_FIELDS) {
    try {
      const getAttributes = Utils.removeInvalidFields(fields, NOTE_FIELDS);
      const noteResponse = await NotesModel.findOne<INote>(
        { id },
        getAttributes
      );
      const note = noteResponse.data;
      return note;
    } catch (error) {
      throw error;
    }
  }
  static async update(id: string, note: INote, fields = NOTE_FIELDS) {
    try {
      const getAttributes = Utils.removeInvalidFields(fields, NOTE_FIELDS);

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
          data.content= noteToUpdate?.content || data.content;
          data.updated_at = Utils.currentTime.getTime();
          return data;
        },
        getAttributes,
      });

      return updatedNoteResponse.data;
    } catch (error) {
      throw error;
    }
  }
  static async updateTitle(id: string, title: string, fields = NOTE_FIELDS) {
    try {
      const getAttributes = Utils.removeInvalidFields(fields, NOTE_FIELDS);
      const updatedNoteResponse = await NotesModel.updateNested<INote>({
        id,
        path: ".title",
        value: (data: INote) => {
          data.title = title || data.title;
          data.updated_at = Utils.currentTime.getTime();
          return data.title;
        },
        getAttributes,
      });

      return updatedNoteResponse.data;
    } catch (error) {
      throw error;
    }
  }

  static async updatePages(id: string, page: INotePage, fields = NOTE_FIELDS) {
    try {
      const getAttributes = Utils.removeInvalidFields(fields, NOTE_FIELDS);
      const updatedNoteResponse = await NotesModel.updateNested({
        id,
        path: ".pages",
        value: (data: INote) => {
          if (!page?.id) {
            data?.pages?.push({
              content: page?.content || "",
              id: Utils.baseUUId(),
            });
          }
          data.pages = data?.pages?.map((prevPage) => {
            return prevPage.id === page?.id ? page : prevPage;
          });
          data.updated_at = Utils.currentTime.getTime();
          return data.pages;
        },
        getAttributes,
      });

      return updatedNoteResponse.data;
    } catch (error) {
      throw error;
    }
  }
  static async delete(id: string) {
    try {
      await NotesModel.findAndRemove({ id });
    } catch (error) {
      throw error;
    }
  }
  static async deletePage(noteId: string, pageId: string) {
    try {
      await NotesModel.updateNested({
        id: noteId,
        path: ".pages",
        value: (data: INote) => {
          if (!pageId) {
            return data.pages;
          }
          data.pages = data?.pages?.filter((prevPage) => prevPage?.id !== pageId);
          data.updated_at = Utils.currentTime.getTime();
          return data.pages;
        },
        getAttributes: NOTE_FIELDS,
      });
    } catch (error) {
      throw error;
    }
  }
}

export const NOTE_FIELDS = NotesModel.fields;
