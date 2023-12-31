// import * as grpc from 'grpc';
// import { User } from './src/models/user.model';
// import * as protoLoader from '@grpc/proto-loader';
// import { dbConnection } from './src/connection/db.connection';
// const packageDefinition = protoLoader.loadSync('./src/proto/users.proto', {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// const usersProto:any = grpc.loadPackageDefinition(packageDefinition);
// const server = new grpc.Server();
// dbConnection();
// server.addService(usersProto.user.UserService.service, {
//   RegisterUser: async(call, callback) => {
//     const { username, email, password } = call.request;
//         const Users = new User({
//             username: username,
//             email: email,
//             password: password,
//         });
//         const Details = await Users.save();
//         console.log(Details);
//     callback(null, { success: true, message: 'User registered successfully' });
//   },
// });
// server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
//     server.start();
// });
// console.log('Server running at http://127.0.0.1:50051');
// import { loadSync } from "@grpc/proto-loader";
// import * as protoLoader from '@grpc/proto-loader';
// import * as grpc from "grpc";
// import { dbConnection } from './src/connection/db.connection';
// import { User } from './src/models/user.model';
// import path from 'path';
// const PROTO_PATH = "./src/proto/users.proto";
// const packageDefinition = protoLoader.loadSync(path.join(__dirname, PROTO_PATH), {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true
// });
// const usersProto: any = grpc.loadPackageDefinition(packageDefinition);
// const server = new grpc.Server();
// dbConnection();
// server.addService(usersProto.user.UserService.service,{
//     RegisterUser: async(call,callback) => {
//         const user = new User(call.request);
//         const response = await user.save();
//         console.log(response);
//         callback(null,response);
//     },
//     GetUserDetails: async(call,callback) => {
//         const user = await User.findOne({username: call.request.username});
//         console.log(user);
//         if(user){
//             callback(null,user);
//         }
//         else{
//             callback({
//                 code: grpc.status.NOT_FOUND,
//                 details: "Not found"
//             });
//         }
//     }
// })
// server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), () => {
//     server.start();
// });
// console.log("Server running at http://127.0.0.1:50051");
//# sourceMappingURL=grpc_server.js.map