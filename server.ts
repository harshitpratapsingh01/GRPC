import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { userRoutes } from "./src/routes/user.routes";
const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})