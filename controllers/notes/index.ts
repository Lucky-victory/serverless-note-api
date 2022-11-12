import { NotesModel } from "../../models/notes.model";
import { Utils } from "../../utils";

export class NotesController {
  static async create(newNote: any) {
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
      const notesResponse = await NotesModel.findByConditions({
        limit,
        offset,
        conditions: [
          {
            search_attribute: "user_id",
            search_value: userId,
            search_type: "equals",
          },
        ],
      });
     return Utils.sortBy(notesResponse.data as object[])
    
    } catch (_) {}
  }
}
