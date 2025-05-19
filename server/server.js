import express from "express";
import connectDB from "./database/connection.js";
import cors from "cors";
import morgan from "morgan";
import usersRouter from "./routes/user.routes.js";
import excerciseRouter from "./routes/excercises.route.js";

const PORT = parseInt(process.env.PORT, 10) ?? 6000;

connectDB();
const app = express();



app.use(cors());
app.disable("x-powered-by");
app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use(excerciseRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
