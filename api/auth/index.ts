import { VercelRequest, VercelResponse } from "@vercel/node";

import { HANDLER_CALLBACK, HTTP_METHODS } from "../../interfaces/shared";

const mainHandler =
(fn: HANDLER_CALLBACK) => async (req: VercelRequest, res: VercelResponse) => {
  return await fn(req, res);
};