export interface ITodo {
  id: string;
  title?: string;
  items: ITodoItem[];
  created_at: number;
  updated_at: number;
  user_id: string;
}

export interface ITodoItem {
  id: string;
  completed?: boolean;
  content: string;
}

export type NEW_TODO = Pick<ITodo, "title" | "items" | "user_id">;
