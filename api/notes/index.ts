import { VercelResponse, VercelRequest } from "@vercel/node";
import { HTTP_METHODS } from "../../interfaces/shared";

import { NotesHandler } from "../../handlers/notes.handler";

export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      await NotesHandler.get(req, res);

    case "POST":
      await NotesHandler.create(req, res);

    default:
      res.status(405).json({
        message: "Unsupported HTTP method",
      });
  }
};
