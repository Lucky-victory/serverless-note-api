import { VercelRequest, VercelResponse } from "@vercel/node";
import { NoteController } from "../../controllers/note";
import { HTTP_METHODS } from "../../interfaces/shared";

export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
        const note = await NoteController.get(id as string);

        res.status(200).json({
          data: note,
          message: "Note retrieved successfully",
        });
      } catch (_) {}
    case "PUT":
      try {
        const note = req.body;
        const { id } = req.query;
        const updatedNote = await NoteController.update(id as string, note);
        res.status(200).json({
          body: `you requested for ${req.query.id} updated`,
          query: req.query,
          data: updatedNote,
        });
      } catch (_) {}
    case "DELETE":
      try {
        const { id } = req.query;
        await NoteController.delete(id as string);
        res.status(200).json({
          body: `you requested for ${req.query.id} updated`,
          query: req.query,
        });
      } catch (_) {}
  }
};
