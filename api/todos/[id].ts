import { VercelRequest, VercelResponse } from "@vercel/node";
import { TodoController } from "../../controllers/todo";
import { HTTP_METHODS } from "../../interfaces/shared";
import { ITodo } from "../../interfaces/todos";

export default async (req: VercelRequest, res: VercelResponse) => {
  const method = req.method as HTTP_METHODS;
  switch (method) {
    case "GET":
      try {
        const { id } = req.query;

        const todo = await TodoController.get(id as string);
        if (!todo) {
          res.status(404).json({
            message: `Todo with id '${id}' does not exist`,
          });
          return;
        }
        res.status(200).json({
          data: todo,
          message: "Todo retrieved successfully",
        });
      } catch (_) {}
    case "PUT":
      try {
        const todoToUpdate = req.body;
        const { id,part } = req.query;

        const todo = await TodoController.get(id as string);
        if (!todo) {
          res.status(404).json({
            message: `Todo with id '${id}' does not exist`,
          });
          return;
        }
        let updatedTodo!:ITodo;
        if(part==='title'){

             updatedTodo = await TodoController.updateTitle(
                id as string,
                todoToUpdate
                ) as ITodo;
            }
            else{
             updatedTodo = (await TodoController.updatedItem(
               id as string,
               todoToUpdate
             )) as ITodo;   
            }

        res.status(200).json({
          message: "Todo updated successfully",
          data: updatedTodo,
        });
      } catch (_) {}
    case "DELETE":
      try {
        const { id } = req.query;
        const todo = await TodoController.get(id as string);
        if (!todo) {
          res.status(404).json({
            message: `Todo with id '${id}' does not exist`,
          });
          return;
        }
        await TodoController.delete(id as string);
        res.status(200).json({
          message: "Todo deleted successfully",
        });
      } catch (_) {}
  }
};
