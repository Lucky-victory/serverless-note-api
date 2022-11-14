import { VercelRequest, VercelResponse } from "@vercel/node";
import { envConfig } from "../config";
import { NotesController } from "../controllers/notes";

export class NotesHandler {
  static async get(req: VercelRequest, res: VercelResponse) {
    try {
      const { category } = req.query;
      if (!category) {
      return  await getUserNotes(req, res);
        
      }
    return  await getUserNotesByCategory(req, res);
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "There was an error, couldn't retrieve notes",
        error: envConfig.is_dev ? error : null,
      });
    }
  }

  static async create(req: VercelRequest, res: VercelResponse) {
    try {
      const newNote = req.body;
      const note = await NotesController.create({
        user_id: "1",
        ...newNote,
      });

      res.status(200).json({
        message: "Note created successfully",
        data: note,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "There was an error, couldn't create note",
        error: envConfig.is_dev ? error : null,
      });
    }
  }
}

const getUserNotes = async (req: VercelRequest, res: VercelResponse) => {
  let { limit = 20, page = 1 } = req.query;
  limit = +limit;
  page = +page;
  const offset = (page - 1) * limit;
  const notesResponse = await NotesController.getAll("1", limit, offset);

return  res.status(200).json({
    message: "Notes retrieved successfully",
    data: notesResponse,
    count: notesResponse?.length,
  });
};

const getUserNotesByCategory = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { category } = req.query;
  const notesResponse = await NotesController.getByCategory(category as string);

 return res.status(200).json({
    message: "Notes retrieved successfully",
    data: notesResponse,
    count: notesResponse?.length,
  });
};
