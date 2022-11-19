import { VercelRequest } from "@vercel/node";
import jwt from "jsonwebtoken";
export class AuthController {
  static getToken(req: VercelRequest) {}
  static validateToken() {}
  static async generateToken<T extends object>(payload: T) {
    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        "123",
        {
          expiresIn: "3d",
        },
        (err, encoded) => {
          if (err) return reject(err);

          return resolve(encoded as string);
        }
      );
    });

    return token as string;
  }
}
