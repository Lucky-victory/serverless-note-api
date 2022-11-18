export interface IUser {
  id?: string;
  fullname: string;
  first_name: string;
  last_name?: string;
  password?: string;
  email: string;
  verified?: boolean;
  profile_image?: string;
  created_at: number;
  updated_at: number;
}
 const columnsToOmit = [
  "password",
  "verified",
  "created_at",
  "updated_at",
] as const;

export type USER_RESULT = Omit<IUser, typeof columnsToOmit[number]>;
export type NEW_USER_GOOGLE = Omit<
  IUser,
  "password" | "created_at" | "updated_at"
>;
export type NEW_USER = Omit<IUser, "created_at" | "updated_at">;
