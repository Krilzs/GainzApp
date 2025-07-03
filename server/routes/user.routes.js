import express from "express";
import UserController from "../controllers/user.controller.js";
import cookieParser from "cookie-parser";

const usersRouter = express.Router();

// Example user controller functions
usersRouter.use(express.json());
usersRouter.use(cookieParser());

// Define routes for user
usersRouter.post("/register", UserController.registerUser);
usersRouter.post("/login", UserController.login);
usersRouter.post("/logout", UserController.logout);
usersRouter.post("/refresh-token", UserController.refreshToken);

usersRouter.get("/info", UserController.myInfo);

usersRouter.get("/routines", UserController.myRoutines);
usersRouter.get("/routines/:routineId", UserController.getRoutinesById);
usersRouter.post("/routines", UserController.setRoutine);
usersRouter.delete("/routines", UserController.deleteRoutine);

usersRouter.post("/routines/exercise", UserController.setExcercise);
usersRouter.delete("/routines/exercise", UserController.deleteExcercise);

export default usersRouter;
