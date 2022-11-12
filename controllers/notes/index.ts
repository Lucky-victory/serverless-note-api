import { INote, NEW_NOTE } from "../../interfaces/note";
import { NotesModel } from "../../models/notes.model";
import { GET_ATTRIBUTES } from "../note";

export class NotesController {
  static async create(newNote: NEW_NOTE) {
    try {
      const createResponse = await NotesModel.create(newNote);
      const createdNoteId = createResponse.data?.inserted_hashes[0];
      return createdNoteId;
    } catch (_) {
      //
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
        getAttributes: GET_ATTRIBUTES,
      });
      return notesResponse.data;
    } catch (_) {}
  }
}
