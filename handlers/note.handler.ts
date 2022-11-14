import { VercelRequest, VercelResponse } from "@vercel/node";
import { envConfig } from "../config";
import { NoteController } from "../controllers/note";

export class NoteHandler {
  static async get(req: VercelRequest, res: VercelResponse) {
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
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "There was an error, couldn't retrieve note",
        error: envConfig.is_dev ? error : null,
      });
    }
  }
  static async update(req: VercelRequest, res: VercelResponse) {
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
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "There was an error, couldn't update note",
        error: envConfig.is_dev ? error : null,
      });
    }
  }
  static async delete(req: VercelRequest, res: VercelResponse) {
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
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "There was an error, couldn't delete note",
        error: envConfig.is_dev ? error : null,
      });
    }
  }
}
