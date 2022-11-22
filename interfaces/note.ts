export interface INote {
  title: string;
  pages: INotePage[];
  updated_at?: number;
  created_at?: number;
  category?: string;
  user_id: string;
  tags?: string[];
}

export type NEW_NOTE = Pick<INote, "category" | "pages" | "title" | "user_id">;

export interface INotePage {
  id: string;
  content: string;
}
export type NOTE_UPDATE_TYPE = "title" | "page" | "all";
