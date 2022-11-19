import { VercelRequest, VercelResponse } from "@vercel/node";

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

  return Promise.resolve(res.status(204).end());
};

export default mainHandler(handler);
