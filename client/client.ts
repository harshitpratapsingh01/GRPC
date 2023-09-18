import * as protoLoader from '@grpc/proto-loader';
import * as grpc from "grpc";
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

const client = new userPackage.UserService("localhost:50051", grpc.credentials.createInsecure());

export default client;