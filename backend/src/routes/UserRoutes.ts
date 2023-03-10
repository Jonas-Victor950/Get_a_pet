import express from "express";
const routerUser = express.Router();

// Controller
import UserController from "../controllers/UserController";

routerUser.post("/register", UserController.register);

export default routerUser;
