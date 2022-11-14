import { envConfig } from '../config';
import { VercelRequest, VercelResponse } from "@vercel/node";
import { TodoController } from "../controllers/todo";
import { ITodo, ITodoItem, TODO_UPDATE_TYPE } from "../interfaces/todos";

export class TodoHandler {
  static async get(req: VercelRequest, res: VercelResponse) {
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
    } catch (error) {
      res.status(500).json({
        data: null,
        error: envConfig.is_dev ? error : null,
        message: "There was an error, can't retreive Todo",
      });
    }
  }

  static async update(req: VercelRequest, res: VercelResponse) {
    try {
      const todoToUpdate: ITodo | ITodoItem = req.body;
      const { id } = req.query;
      const part = req.query.part as TODO_UPDATE_TYPE;

      const todo = await TodoController.get(id as string);
      if (!todo) {
        res.status(404).json({
          message: `Todo with id '${id}' does not exist`,
        });
        return;
      }
      let updatedTodo!: ITodo;
      if (part === "title") {
        // update only title
        const todoTitle = (todoToUpdate as ITodo)?.title;
        updatedTodo = (await TodoController.updateTitle(
          id as string,
          todoTitle as string
        )) as ITodo;
      } else if (part === "item") {
        // update items
        const todoItem = todoToUpdate as ITodoItem;
        updatedTodo = (await TodoController.updatedItems(
          id as string,
          todoItem
        )) as ITodo;
      } else {
        // update  everything
        updatedTodo = (await TodoController.update(
          id as string,
          todoToUpdate as ITodo
        )) as ITodo;
      }

      res.status(200).json({
        message: "Todo updated successfully",
        data: updatedTodo,
      });
    } catch (error) {
      res.status(500).json({
        data: null,error:envConfig.is_dev?error:null,
        message: "There was an error, couldn't update Todo",
      });
    }
  }
  static async delete(req: VercelRequest, res: VercelResponse) {
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
    } catch (error) {
      res.status(500).json({
        data: null,
        error: envConfig.is_dev ? error : null,
        message: "There was an error,couldn't  delete Todo",
      });
    }
  }
}
