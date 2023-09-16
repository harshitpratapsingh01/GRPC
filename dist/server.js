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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grpc = __importStar(require("grpc"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const db_connection_1 = require("./src/connection/db.connection");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// Load your protobuf definition
const packageDefinition = protoLoader.loadSync('./src/proto/users.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const proto = grpc.loadPackageDefinition(packageDefinition);
// Create a gRPC client and server
const userService = new proto.user.UserService('localhost:50051', grpc.credentials.createInsecure());
// Define a route for user registration
app.use(express_1.default.json());
(0, db_connection_1.dbConnection)();
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    // Call the gRPC service to register the user
    userService.RegisterUser({ username, email, password }, (error, response) => {
        if (error) {
            console.error('Error registering user:', error);
            return res.status(500).json({ error: 'User registration failed' });
        }
        return res.status(201).json(response);
    });
});
// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map