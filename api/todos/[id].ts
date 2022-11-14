import { VercelRequest, VercelResponse } from "@vercel/node";

import { TodoHandler } from "../../handlers/todo.handler";
import { HTTP_METHODS } from "../../interfaces/shared";

export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      await TodoHandler.get(req, res);
    case "PUT":
      await TodoHandler.update(req, res);
    case "DELETE":
      await TodoHandler.delete(req, res);
    default:
      res.status(405).json({
        message: "Unsupported HTTP method",
      });
  }
};
