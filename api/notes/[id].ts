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
        if (!note) {
          res.status(404).json({
            message: `Note with id '${id}' does not exist`,
          });
          return;
        }
        res.status(200).json({
          data: note,
          message: "Note retrieved successfully",
        });
      } catch (_) {}
    case "PUT":
      try {
        const noteToUpdate = req.body;
        const { id } = req.query;

        const note = await NoteController.get(id as string);
        if (!note) {
          res.status(404).json({
            message: `Note with id '${id}' does not exist`,
          });
          return;
        }
        const updatedNote = await NoteController.update(
          id as string,
          noteToUpdate
        );

        res.status(200).json({
          message: "Note updated successfully",
          data: updatedNote,
        });
      } catch (_) {}
    case "DELETE":
      try {
        const { id } = req.query;
        const note = await NoteController.get(id as string);
        if (!note) {
          res.status(404).json({
            message: `Note with id '${id}' does not exist`,
          });
          return;
        }
        await NoteController.delete(id as string);
        res.status(200).json({
          message: "Note deleted successfully",
        });
      } catch (_) {}
  }
};
