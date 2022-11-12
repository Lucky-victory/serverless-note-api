"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const harpee_1 = require("harpee");
const _1 = require(".");
const connectDB = () => harpee_1.harpee.createConnection({
    host: _1.envConfig.db_host,
    pass: _1.envConfig.db_pass,
    user: _1.envConfig.db_user,
});
exports.connectDB = connectDB;
