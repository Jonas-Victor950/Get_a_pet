import express from "express";
const routerUser = express.Router();

// Controller
import UserController from "../controllers/UserController";

// Middlewares
import checkToken from "../helpers/verify-token";
import imageUpload from "../helpers/image-upload";

routerUser.post("/register", UserController.register);
routerUser.post("/login", UserController.login);
routerUser.get("/checkuser", UserController.checkUser);
routerUser.get("/:id", UserController.getUserById);
routerUser.patch("/edit/:id", checkToken, imageUpload.single("image"), UserController.editUser);

export default routerUser;
