import { VercelRequest, VercelResponse } from "@vercel/node";
import { envConfig } from "../config";
import { TodosController } from "../controllers/todos";

export class TodosHandler {
  static async get(req: VercelRequest, res: VercelResponse) {
    try {
      const todos = await TodosController.getAll();

      res.status(200).json({
        message: "Todos retrieved successfully",
        data: todos,
        count: todos?.length,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "There was an error, couldn't retrieve todos",
        error: envConfig.is_dev ? error : null,
      });
    }
  }
  static async create(req: VercelRequest, res: VercelResponse) {
    try {
      const newTodo = req.body;

      const todo = await TodosController.create({
        user_id: "1",
        ...newTodo,
      });

      res.status(200).json({
        message: "Todo created successfully",
        data: todo,
      });
    } catch (error) {
      res.status(500).json({
        message: "There was an error, couldn't create todo",
        error: envConfig.is_dev ? error : null,
      });
    }
  }
}
