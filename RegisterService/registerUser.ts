import * as protoLoader from '@grpc/proto-loader';
import * as grpc from "grpc";
import { dbConnection } from '../src/connection/db.connection';
import { User } from '../src/models/user.model';
import path from 'path';
const PROTO_PATH = "../src/proto/users.proto";

const packageDefinition = protoLoader.loadSync(path.join(__dirname, PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const usersProto: any = grpc.loadPackageDefinition(packageDefinition);
const userPackage = usersProto.userPackage;
const server = new grpc.Server();
dbConnection();

server.addService(userPackage.UserService.service, {
    "RegisterUser": RegisterUser,
    "GetUserDetails": GetUserDetails,
    "LoginUser": LoginUser
});

async function RegisterUser(call, callback) {
    const user = new User(call.request);
    const response = await user.save();
    console.log(response);
    callback(null, 
        {
            success: true,
            message: "Signup Successfully",
            data: response
        }
    );
}

async function GetUserDetails(call, callback) {
    const user = await User.findOne({ username: call.request.username });
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
}

async function LoginUser(call, callback) {
    console.log(call);
    console.log(call.request);
    const { email, password } = call.request;
    const isUser = await User.findOne({
        email: email, password: password
    });
    console.log(isUser);
    if (isUser) {
        callback(null,
            {
                success: true,
                message: "Logged in Successfully",
                user_data: isUser
            }
        );
    }
    else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        });
    }
}

server.bindAsync("0.0.0.0:50051", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});
console.log("Server running at http://127.0.0.1:50051");



