import { INote, NEW_NOTE } from "../interfaces/note";
import { NotesModel } from "../models/notes.model";
import { Utils } from "../utils";
import { NOTE_FIELDS } from "./note.controller";

export class NotesController {
  static async create(newNote: NEW_NOTE) {
    try {
      // loop through the pages and add an id
      newNote.pages = newNote?.pages?.length
        ? newNote?.pages?.map((page) => {
            if (typeof page === "object") {
              page.id = Utils.baseUUId();
            }

            return page;
          })
        : [];
      const createResponse = await NotesModel.create({
        ...newNote,
        id: Utils.baseUUId(30),
      });
      const createdNoteId = createResponse.data?.inserted_hashes[0];
      const createdNote = await NotesModel.findOne<INote>(
        {
          id: createdNoteId as string,
        },
        NOTE_FIELDS
      );

      return createdNote.data;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(userId: string, limit: number = 20, offset: number = 0) {
    try {
      const notesResponse = await NotesModel.find<INote[]>({
        limit,
        offset,
        order: "desc",
        orderby: ["updated_at"],
        where: `user_id="${userId}"`,
        getAttributes: NOTE_FIELDS,
      });
      return notesResponse.data;
    } catch (error) {
      throw error;
    }
  }
  static async getByCategory(category: string) {
    try {
      const userId = "1";
      const notesResponse = await NotesModel.find<INote[]>({
        order: "desc",
        orderby: ["updated_at"],
        where: `user_id="${userId}" AND category="${category}"`,
        getAttributes: NOTE_FIELDS,
      });
      return notesResponse.data;
    } catch (error) {
      throw error;
    }
  }
}
