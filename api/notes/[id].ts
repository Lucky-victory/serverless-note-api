import { VercelRequest, VercelResponse } from "@vercel/node";

import { NoteHandler } from "../../handlers/note.handler";
import { HTTP_METHODS } from "../../interfaces/shared";

export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      await NoteHandler.get(req, res);
    case "PUT":
      await NoteHandler.update(req, res);
    case "DELETE":
      await NoteHandler.delete(req, res);
    default:
      res.status(405).json({
        message: "Unsupported HTTP method",
      });
  }
};
