import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "../db/dbConnection";
import userRouter from "./routers/user.router";

// connection DB
dbConnection();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.listen(5000, () => {
  console.log("server started on localhost:5000");
});
