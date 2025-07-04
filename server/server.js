import express from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routes/user.routes.js";
import excerciseRouter from "./routes/excercises.route.js";
import authenticate from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const PORT = parseInt(process.env.PORT, 10) ?? 6000;

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.disable("x-powered-by");
app.use(morgan("dev"));

app.get("/check-auth", authenticate, (req, res) => {
  res.json({ isLoggedIn: true });
});

app.use("/users", usersRouter);
app.use(excerciseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
