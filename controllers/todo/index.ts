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
          data.title = title || data.title;

          return data.title;
        },
        getAttributes: TODO_FIELDS,
      });

      return updatedTodoResponse.data;
    } catch (_) {}
  }

  static async updatedItems(
    todoId: string,

    todoItem: ITodoItem
  ) {
    try {
      const updatedTodoResponse = await TodosModel.updateNested<ITodo>({
        id: todoId,
        path: ".",
        value: (data: ITodo) => {
          if (!todoItem?.id) {
            data.items.push({
              content: todoItem?.content,
              id: `item_${Utils.generateID(false)}`,
            });
          }
          data.items.map((prevItem) => {
            prevItem.id === todoItem.id ? todoItem : prevItem;
          });
          data.updated_at = Utils.currentTime.getTime();

          return data;
        },
        getAttributes: TODO_FIELDS,
      });

      return updatedTodoResponse.data;
    } catch (_) {}
  }
  static async update(
    todoId: string,

    todoToUpdate: ITodo
  ) {
    try {
      const updatedTodoResponse = await TodosModel.updateNested<ITodo>({
        id: todoId,
        path: ".",
        value: (data: ITodo) => {
          data.title = todoToUpdate?.title || data.title;
          data.items = todoToUpdate?.items || data.items;
          data.updated_at = Utils.currentTime.getTime();
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
