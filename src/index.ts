import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./server";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import router from "./routes/routes";

//Initialize dotenv variable access
dotenv.config();
export const mongoUrl = process.env.MONGODB_URL;
export const nodeEnv = process.env.NODE_ENV;
export const serverPort = process.env.SERVER_PORT;
export const saltRound = process.env.SALT_ROUND;
export const defPass = process.env.DEFAULT_PASS;

//Connect Mongodb
connectToDB();

//Initialize app
const app = express();

//Primary middlewares
app.use(express.json());
app.use(cors());

//Applicatin route
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from University Management");
});

app.listen(serverPort, () => {
  console.log(`UM is listening on ${serverPort}`);
});

//Global error handler
app.use(errorHandler);

app.use("/", notFound);

//Export for vercel configuration
export default app;
