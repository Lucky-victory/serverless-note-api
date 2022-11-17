import { VercelResponse, VercelRequest } from "@vercel/node";

import { TodosHandler } from "../../handlers/todos.handler";
import { HANDLER_CALLBACK, HTTP_METHODS } from "../../interfaces/shared";

import { CorsHandler } from "../../handlers/cors.handler";
const corsHandler = new CorsHandler();

const mainHandler =
  (fn: HANDLER_CALLBACK) => async (req: VercelRequest, res: VercelResponse) => {
    corsHandler.setHeader(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    return await fn(req, res);
  };
const handler = (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      return TodosHandler.get(req, res);

    case "POST":
      return TodosHandler.create(req, res);
    default:
      return Promise.resolve(
        res.status(405).json({
          message: "Unsupported HTTP method",
        })
      );
  }
};

export default mainHandler(handler);
