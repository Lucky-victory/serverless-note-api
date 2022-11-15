import { VercelResponse, VercelRequest } from "@vercel/node";
import { HANDLER_CALLBACK, HTTP_METHODS } from "../../interfaces/shared";

import { NotesHandler } from "../../handlers/notes.handler";

const mainHandler =
  (fn: HANDLER_CALLBACK) => async (req: VercelRequest, res: VercelResponse) => {
    return await fn(req, res);
  };
const handler = (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      return NotesHandler.get(req, res);

    case "POST":
      return NotesHandler.create(req, res);

    default:
      return Promise.resolve(
        res.status(405).json({
          message: "Unsupported HTTP method",
        })
      );
  }
};

export default mainHandler(handler);
