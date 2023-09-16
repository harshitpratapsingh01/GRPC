// import * as grpc from 'grpc';
// import * as protoLoader from '@grpc/proto-loader';
// const packageDefinition = protoLoader.loadSync('./src/proto/users.proto', {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });
// const usersProto:any = grpc.loadPackageDefinition(packageDefinition);
// const client = new usersProto.user.UserService('127.0.0.1:50051', grpc.credentials.createInsecure());
// const userRequest = {
//   username: 'exampleUser',
//   email: 'user@example.com',
//   password: 'password123',
// };
// client.RegisterUser(userRequest, (error, response) => {
//   if (!error) {
//     console.log('Response:', response.message);
//   } else {
//     console.error('Error:', error.message);
//   }
// });
//# sourceMappingURL=grpc_client.js.map