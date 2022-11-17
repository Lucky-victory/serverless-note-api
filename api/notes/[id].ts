import { VercelRequest, VercelResponse } from "@vercel/node";

import { HANDLER_CALLBACK, HTTP_METHODS } from "../../interfaces/shared";

import { NoteHandler } from "../../handlers/note.handler";
const mainHandler =
  (fn: HANDLER_CALLBACK) => async (req: VercelRequest, res: VercelResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    return await fn(req, res);
  };

const handler = (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      return NoteHandler.get(req, res);
    case "PUT":
      return NoteHandler.update(req, res);
    case "DELETE":
      return NoteHandler.delete(req, res);
    default:
      return Promise.resolve(
        res.status(405).json({
          message: "Unsupported HTTP method",
        })
      );
  }
};

export default mainHandler(handler);
