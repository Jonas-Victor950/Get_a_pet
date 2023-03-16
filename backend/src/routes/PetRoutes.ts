import express from "express";
const routerPet = express.Router();

// Controller
import PetController from "../controllers/PetController";

// Middlewares
import checkToken from "../helpers/verify-token";
import imageUpload from "../helpers/image-upload";

routerPet.post("/create", PetController.create);

export default routerPet;
