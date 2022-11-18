import { UsersModel } from "../models/users.model";
import { Utils } from "../utils";
import {
  IUser,
  NEW_USER,
  NEW_USER_GOOGLE,
  USER_RESULT,
} from "./../interfaces/user";
const USER_GET_ATTRIBUTES = [
  "id",
  "profile_image",
  "fullname",
  "first_name",
  "last_name",
];
export class UsersController {
  static async createUser(newUser: NEW_USER_GOOGLE | NEW_USER) {
    try {
      const response = await UsersModel.create(newUser);
      const createdUserId = response.data?.inserted_hashes[0] as string;
      const user = await UsersController.getUserById(createdUserId);

      return user as USER_RESULT;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(
    id: string,
    attributes: string[] = USER_GET_ATTRIBUTES
  ) {
    try {
      const userResponse = await UsersModel.findOne<USER_RESULT>(
        { id },
        attributes
      );
      return userResponse.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser() {}
}
export const fieldsToOmit = [
  "password",
  "verified",
  "created_at",
  "updated_at",
];

export const USER_FIELDS = UsersModel.fields;
