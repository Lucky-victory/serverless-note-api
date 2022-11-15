import { VercelRequest, VercelResponse } from "@vercel/node";

export type HTTP_METHODS = "GET" | "PUT" | "UPDATE" | "DELETE" | "POST";

export type HANDLER_CALLBACK = (
  req: VercelRequest,
  res: VercelResponse
) => Promise<VercelResponse>;
