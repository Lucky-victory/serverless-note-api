export interface INote {
  title: string;
  content: string;
  updated_at?: number;
  created_at?: number;
  category?: string;
  user_id: string;
}

export type NEW_NOTE = Pick<
  INote,
  "category" | "content" | "title" | "user_id"
>;
