import express from "express";
const routerUser = express.Router();

// Controller
import UserController from "../controllers/UserController";

routerUser.post("/register", UserController.register);
routerUser.post("/login", UserController.login);

export default routerUser;
