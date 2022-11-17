import { ITodo, NEW_TODO } from "../interfaces/todos";
import { TodosModel } from "../models/todos.model";
import { Utils } from "../utils";
import { TODO_FIELDS } from "./todo.controller";

export class TodosController {
  static async getAll() {
    try {
      const todosResponse = await TodosModel.find<ITodo[]>({
        orderby: ["updated_at"],
        order: "desc",
        getAttributes: TODO_FIELDS,
      });

      return todosResponse.data as ITodo[];
    } catch (error) {
      throw error;
    }
  }

  static async create(todo: NEW_TODO) {
    try {
      const newTodo = todo;
      // if the todo has items, add an id to each
      newTodo.items?.length
        ? newTodo.items.map((item) => {
            item.id = `item_${Utils.generateID(false)}`;
            return item;
          })
        : null;

      const todoCreateResponse = await TodosModel.create(newTodo);
      const createdTodoID = todoCreateResponse.data?.inserted_hashes[0];
      const createdTodo = await TodosModel.findOne<ITodo>(
        {
          id: createdTodoID as string,
        },
        TODO_FIELDS
      );

      return createdTodo.data;
    } catch (error) {
      throw error;
    }
  }
}
