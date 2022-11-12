import { VercelRequest, VercelResponse } from "@vercel/node";
import { NotesModel } from "../../models/notes.model";

export default async (req: VercelRequest, res: VercelResponse) => {
  await NotesModel.create({
    id: req.query.id,
    title: "My first note",
  });
  res.status(200).json({
    body: `you requested for ${req.query.id} updated`,
    query: req.query,
  });
};
