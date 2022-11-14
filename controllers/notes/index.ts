import { INote, NEW_NOTE } from "../../interfaces/note";
import { NotesModel } from "../../models/notes.model";
import { Utils } from "../../utils";
import { NOTE_FIELDS } from "../note";

export class NotesController {
  static async create(newNote: NEW_NOTE) {
    try {
      const note = newNote?.pages?.map((page) => {
        if (typeof page === "object") {
          page.id = `page_${Utils.generateID(false)}`;
        }

        return page;
      });
      const createResponse = await NotesModel.create(note);
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
      console.log(error);
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
    } catch (_) {}
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
    } catch (_) {}
  }
}
