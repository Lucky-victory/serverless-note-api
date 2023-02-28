import { MyUtils } from "my-node-ts-utils";
import sortBy from "just-sort-by";
import pick from "just-pick";
import omit from "just-omit";
import { Base64UUID } from "base64-uuid";

// added caache, fetch data from cahce, update cache an return the data before updating the database
export class Utils extends MyUtils {
  static sortBy<T>(
    arr: T[],
    iteratee: string | ((val: T) => any) = "updated_at"
  ) {
    return sortBy(arr, iteratee);
  }
  static pick<T>(obj: T, select: (keyof T)[] | string[]) {
    return pick(obj, select as (keyof T)[]);
  }
  static omit<T extends object>(obj: T, remove: (keyof T)[] | string[]) {
    return omit(obj, remove as (keyof T)[]);
  }
  static baseUUID(len = 10) {
    return Base64UUID.generate(len);
  }
  static removeInvalidFields(fields: string[], validFields: string[]) {
    return fields.reduce((accum, field) => {
      if (validFields.includes(field)) {
        accum.push(field);
        return accum;
      }
      return accum;
    }, [] as string[]);
  }
  static stringToArray(str: string, seperator = ",") {
    return str?.split(seperator);
  }
}
