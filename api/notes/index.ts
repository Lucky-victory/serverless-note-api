import { VercelResponse, VercelRequest } from "@vercel/node";
import { NoteController } from "../../controllers/note";
import { NotesController } from "../../controllers/notes";
import { HTTP_METHODS } from "../../interfaces/shared";

export const config = {
  api: {
    bodyParser: true,
  },
};
export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      try {
        await getUserNotes(req, res);
      } catch (err) {
        res.status(500).json({
          message: "An error occurred, couldn't retrieve notes",
          error: err,
        });
      }

    case "POST":
      try {
        const newNote = req.body;
        const notesResponse = await NotesController.create({
          user_id: "1",
          ...newNote,
        });
        const note = await NoteController.get(notesResponse as string);
        res.status(200).json({
          body: `main route create`,

          data: note,
        });
      } catch (err) {
        res.status(500).json({
          message: "An error occurred, couldn't create note",
          error: err,
        });
      }
  }
};

const getUserNotes = async (req: VercelRequest, res: VercelResponse) => {
  let { limit = 20, page = 1 } = req.query;
  limit = +limit;
  page = +page;
  const offset = (page - 1) * limit;
  const notesResponse = await NotesController.getAll("1", limit, offset);

  res.status(200).json({
    body: `main route updated`,
    query: req.query,
    data: notesResponse,
  });
};
