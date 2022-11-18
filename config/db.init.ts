import { NotesModel } from "../models/notes.model";
import { TodosModel } from "../models/todos.model";
import { TokensModel } from "../models/tokens.model";
import { UsersModel } from "../models/users.model";

export async function initializeDB() {
  try {
    await NotesModel.init();
    await TodosModel.init();
    await UsersModel.init();
    await TokensModel.init();
    console.log("Database initialized successfully");
  } catch {
    console.log(
      "Error: couldn't initialize database, please check your config"
    );
  }
}

initializeDB();
