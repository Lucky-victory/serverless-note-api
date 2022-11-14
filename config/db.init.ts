import { NotesModel } from "../models/notes.model";
import { TodosModel } from "../models/todos.model";

export async function initializeDB() {
  try {
    await NotesModel.init();
    await TodosModel.init();
    console.log("Database initialized successfully");
  } catch {
    console.log(
      "Error: couldn't initialize database, please check your config"
    );
  }
}

initializeDB();
