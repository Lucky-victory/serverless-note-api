import { VercelResponse, VercelRequest } from "@vercel/node";

import { TodosHandler } from "../../handlers/todos.handler";
import { HTTP_METHODS } from "../../interfaces/shared";
export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      await TodosHandler.get(req, res);

    case "POST":
      await TodosHandler.create(req, res);
    default:
      res.status(405).json({
        message: "Unsupported HTTP method",
      });
  }
};
