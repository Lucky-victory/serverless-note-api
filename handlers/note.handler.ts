import { VercelRequest, VercelResponse } from "@vercel/node";
import { envConfig } from "../config";
import { NoteController } from "../controllers/note";
import { INote, NOTE_UPDATE_TYPE } from "../interfaces/note";

export class NoteHandler {
  static async get(req: VercelRequest, res: VercelResponse) {
    try {
      const { id } = req.query;

      const note = await NoteController.get(id as string);
      if (!note) {
      return  res.status(404).json({
          message: `Note with id '${id}' does not exist`,
        });
        
      }
     return  res.status(200).json({
        data: note,
        message: "Note retrieved successfully",
      });
    } catch (error) {
    return  res.status(500).json({
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
      const part = (req.query.part as NOTE_UPDATE_TYPE) || "page";
      const note = await NoteController.get(id as string);
      if (!note) {
      return  res.status(404).json({
          message: `Note with id '${id}' does not exist`,
        });
        
      }
      let updatedNote!: INote;
      if (part === "title") {
        updatedNote = (await NoteController.updateTitle(
          id as string,
          noteToUpdate?.title
        )) as INote;
      } else if (part === "page") {
        updatedNote = (await NoteController.updatePages(id as string, {
          id: noteToUpdate?.id,
          content: noteToUpdate?.content,
        })) as INote;
      } else {
        updatedNote = (await NoteController.update(
          id as string,
          noteToUpdate
        )) as INote;
      }
   return   res.status(200).json({
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
