import express from "express";
import cors from "cors";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


import useRouter from "./routes/todo.routes.js"
app.use("/api/v1", useRouter);
// http://localhost:8000/api/v1

export {app }