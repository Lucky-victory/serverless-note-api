import { envConfig } from "../config";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { OAuth2Client } from "google-auth-library";
import { UsersController } from "../controllers/user.controller";

const googleClient = new OAuth2Client({
  clientId: envConfig.google_client_id,
});
export class AuthHandler {
  static async signInWithGoogle(req: VercelRequest, res: VercelResponse) {
    try {
      const { idToken } = req.body;
      const googleUserToken = await googleClient.verifyIdToken({
        idToken,
        audience: envConfig.google_client_id,
      });
      const googleUser = googleUserToken.getPayload();

      //chekc if the user already signed in with their google account
      let user = await UsersController.getUserById(googleUser?.sub as string);

      if (!user) {
        // otherwise create new user
        user = await UsersController.createUser({
          id: googleUser?.sub,
          fullname: googleUser?.name as string,
          last_name: googleUser?.family_name,
          first_name: googleUser?.given_name as string,
          email: googleUser?.email as string,
          verified: googleUser?.email_verified,
          profile_image: googleUser?.picture,
        });
      }
      return res.status(200).json({
        message: "sign in successful",
        data: {
          user,
        },
      });
    } catch (error) {
      return res.status(500).json({
        data: null,
        message: "There was an error, couldn't signin",
        error: envConfig.is_dev ? error : null,
      });
    }
  }
  static async signUp(req: VercelRequest, res: VercelResponse) {}
  static async signOut(req: VercelRequest, res: VercelResponse) {}
}
