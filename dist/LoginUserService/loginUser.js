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
const PROTO_PATH = "../src/proto/login.proto";
const packageDefinition = protoLoader.loadSync(path_1.default.join(__dirname, PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const loginProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();
(0, db_connection_1.dbConnection)();
server.addService(loginProto.userLogin.LoginService.service, {
    LoginUser: (call, callback) => __awaiter(void 0, void 0, void 0, function* () {
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
    })
});
server.bindAsync("127.0.0.1:50052", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
console.log("Server running at http://127.0.0.1:50052");
//# sourceMappingURL=loginUser.js.map