import { VercelResponse, VercelRequest } from "@vercel/node";

import { TodosController } from "../../controllers/todos";
import { HTTP_METHODS } from "../../interfaces/shared";
export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      try {
        const todos = await TodosController.getAll();

        res.status(200).json({
          body: `main route all`,
          message: "Todos retrieved successfully",
          data: todos,
          count: todos?.length,
        });
      } catch (err) {
        res.status(500).json({
          message: "An error occurred, couldn't retrieve todos",
          error: err,
        });
      }

    case "POST":
      try {
        const newTodo = req.body;
        console.log(newTodo);

        const todo = await TodosController.create({
          user_id: "1",
          ...newTodo,
        });

        res.status(200).json({
          body: `main route create`,
          message: "Todo created successfully",
          data: todo,
        });
      } catch (err) {
        res.status(500).json({
          message: "An error occurred, couldn't create todo",
          error: err,
        });
      }
  }
};
