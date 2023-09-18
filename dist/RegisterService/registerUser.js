"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const protoLoader = __importStar(require("@grpc/proto-loader"));
const grpc = __importStar(require("grpc"));
const db_connection_1 = require("../src/connection/db.connection");
const user_model_1 = require("../src/models/user.model");
const path_1 = __importDefault(require("path"));
const PROTO_PATH = "../src/proto/users.proto";
const packageDefinition = protoLoader.loadSync(path_1.default.join(__dirname, PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const usersProto = grpc.loadPackageDefinition(packageDefinition);
const userPackage = usersProto.userPackage;
const server = new grpc.Server();
(0, db_connection_1.dbConnection)();
server.addService(userPackage.UserService.service, {
    "RegisterUser": RegisterUser,
    "GetUserDetails": GetUserDetails,
    "LoginUser": LoginUser
});
function RegisterUser(call, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_model_1.User(call.request);
        const response = yield user.save();
        console.log(response);
        callback(null, {
            success: true,
            message: "Signup Successfully",
            data: response
        });
    });
}
function GetUserDetails(call, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ username: call.request.username });
        console.log(user);
        if (user) {
            callback(null, user);
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    });
}
function LoginUser(call, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(call);
        console.log(call.request);
        const { email, password } = call.request;
        const isUser = yield user_model_1.User.findOne({
            email: email, password: password
        });
        console.log(isUser);
        if (isUser) {
            callback(null, {
                success: true,
                message: "Logged in Successfully",
                user_data: isUser
            });
        }
        else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    });
}
server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
console.log("Server running at http://127.0.0.1:50051");
//# sourceMappingURL=registerUser.js.map