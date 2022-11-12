import { NotesModel } from "../models/notes.model";

export async function initializeDB() {
  try {
    await NotesModel.init();
    console.log("Database initialized successfully");
  } catch {
    console.log(
      "Error: couldn't initialize database, please check your config"
    );
  }
}

initializeDB();
