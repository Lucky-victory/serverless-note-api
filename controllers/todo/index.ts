import { ITodo, ITodoItem } from "./../../interfaces/todos";
import { TodosModel } from "../../models/todos.model";
import { Utils } from "../../utils";

export class TodoController {
  static async get(id: string) {
    try {
      const todoResponse = await TodosModel.findOne<ITodo>({ id }, TODO_FIELDS);

      return todoResponse.data;
    } catch (_) {}
  }
  static async updateTitle(todoId: string, title: string) {
    try {
      const updatedTodoResponse = await TodosModel.updateNested<ITodo>({
        id: todoId,
        path: ".title",
        value: (data: ITodo) => {
          data.updated_at = Utils.currentTime.getTime();
          data.title = title;

          return data.title;
        },
      });

      return updatedTodoResponse.data;
    } catch (_) {}
  }

  static async updatedItem(
    todoId: string,

    todoItemsToUpdate: ITodoItem[]
  ) {
    try {
      const updatedTodoResponse = await TodosModel.updateNested<ITodo>({
        id: todoId,
        path: ".",
        value: (data: ITodo) => {
          data.updated_at = Utils.currentTime.getTime();
          data.items = todoItemsToUpdate;
          return data;
        },
        getAttributes: TODO_FIELDS,
      });

      return updatedTodoResponse.data;
    } catch (_) {}
  }

  static async delete(todoId: string) {
    try {
      await TodosModel.findByIdAndRemove([todoId]);
    } catch (_) {}
  }
}

export const TODO_FIELDS = TodosModel.fields;
