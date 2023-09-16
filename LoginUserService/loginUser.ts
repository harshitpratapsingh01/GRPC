import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "grpc";
import { dbConnection } from "../src/connection/db.connection";
import { User } from "../src/models/user.model";
import path from "path";
const PROTO_PATH = "../src/proto/login.proto"

const packageDefinition = protoLoader.loadSync(path.join(__dirname, PROTO_PATH), {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const loginProto: any = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
dbConnection();

server.addService(loginProto.userLogin.LoginService.service,{
    LoginUser: async(call,callback) => {
        console.log(call.request);
        const {email, password} = call.request;
        const isUser = await User.findOne({
            email:email,password:password
        });
        console.log(isUser);
        if(isUser){
            callback(null,
                {
                    success: true, 
                    message: "Logged in Successfully", 
                    user_data: isUser
                }
            );
        }
        else{
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
})

server.bindAsync("127.0.0.1:50052", grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});

console.log("Server running at http://127.0.0.1:50052");