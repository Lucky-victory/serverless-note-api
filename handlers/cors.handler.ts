import { VercelResponse } from "@vercel/node";
import { envConfig } from "../config";
import { ICorsHeaders } from "../interfaces/shared";

const defaultHeaders: ICorsHeaders[] = [
  {
    "Access-Control-Allow-Credentials": "true",
  },
  {
    "Access-Control-Allow-Origin": envConfig.allowed_origins,
  },
  {
    "Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST,PUT",
  },
  {
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
];
export class CorsHandler {
  setHeader(res: VercelResponse, headers: ICorsHeaders[] = defaultHeaders) {
    for (const header of headers) {
      for (const key in header) {
        res.setHeader(key, header[key]);
      }
    }
  }
}
