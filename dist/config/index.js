"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.envConfig = {
    db_host: process.env.DB_HOST,
    db_pass: process.env.DB_PASS,
    db_user: process.env.DB_USER,
    db_schema: process.env.DB_SCHEMA
};
