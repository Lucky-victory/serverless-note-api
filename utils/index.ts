import { MyUtils } from "my-node-ts-utils";
import sortBy from "just-sort-by";
import pick from "just-pick";

export class Utils extends MyUtils {
  static sortBy<T>(arr: T[], iteratee: string | ((val: T) => any)='updated_at') {
    return sortBy(arr, iteratee);
  }
  static pick<T>(obj:T,select:(keyof T)[]){
return pick(obj,select)
  }
}
