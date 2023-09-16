import express, { Request, Response } from 'express';
import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { dbConnection } from './src/connection/db.connection';
import * as dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Load your protobuf definition
const packageDefinition = protoLoader.loadSync('./src/proto/users.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const proto:any = grpc.loadPackageDefinition(packageDefinition);

// Create a gRPC client and server
const userService = new proto.user.UserService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Define a route for user registration
app.use(express.json());
dbConnection()

app.post('/register', (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Call the gRPC service to register the user
  userService.RegisterUser(
    { username, email, password },
    (error: grpc.ServiceError | null, response: any) => {
      if (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'User registration failed' });
      }
      return res.status(201).json(response);
    }
  );
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
