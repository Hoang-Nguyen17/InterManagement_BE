"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET } = process.env;
const jwtObj = {
    secret: JWT_SECRET,
};
exports.default = jwtObj;
//# sourceMappingURL=jwt.js.map