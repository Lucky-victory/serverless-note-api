"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const my_node_ts_utils_1 = require("my-node-ts-utils");
const just_sort_by_1 = __importDefault(require("just-sort-by"));
class Utils extends my_node_ts_utils_1.MyUtils {
    static sortBy(arr, iteratee = 'updated_at') {
        return (0, just_sort_by_1.default)(arr, iteratee);
    }
}
exports.Utils = Utils;