import express from "express";
const routerPet = express.Router();

// Controller
import PetController from "../controllers/PetController";

// Middlewares
import checkToken from "../helpers/verify-token";
import imageUpload from "../helpers/image-upload";

routerPet.post(
  "/create",
  checkToken,
  imageUpload.array("images"),
  PetController.create
);
routerPet.get("/", PetController.getAll);

export default routerPet;
