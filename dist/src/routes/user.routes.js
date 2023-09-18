"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post('/Register', user_controller_1.User.registerUser);
//# sourceMappingURL=user.routes.js.map