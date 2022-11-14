import { VercelResponse, VercelRequest } from "@vercel/node";
import { HTTP_METHODS } from "../../interfaces/shared";

import { NotesController } from "../../controllers/notes";

export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      try {
        const { category } = req.query;
        if (!category) {
          await getUserNotes(req, res);
          return;
        }
        await getUserNotesByCategory(req, res);
      } catch (err) {
        res.status(500).json({
          message: "An error occurred, couldn't retrieve notes",
          error: err,
        });
      }

    case "POST":
      try {
        const newNote = req.body;
        const note = await NotesController.create({
          user_id: "1",
          ...newNote,
        });

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
    message: "Notes retrieved successfully",
    data: notesResponse,
    result_count: notesResponse?.length,
  });
};

const getUserNotesByCategory = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { category } = req.query;
  const notesResponse = await NotesController.getByCategory(category as string);

  res.status(200).json({
    message: "Notes retrieved successfully",
    data: notesResponse,
    result_count: notesResponse?.length,
  });
};
