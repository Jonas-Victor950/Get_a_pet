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
routerPet.get("/mypets", checkToken, PetController.getAllUserPets);
routerPet.get("/myadoptions", checkToken, PetController.getAllUserAdoptions);
routerPet.get("/:id", PetController.getPetById);
routerPet.delete("/:id", checkToken, PetController.removePetById);
routerPet.patch(
  "/:id",
  checkToken,
  imageUpload.array("images"),
  PetController.updatePet
);
routerPet.patch("/schedule/:id", checkToken, PetController.schedule);
routerPet.patch("/conclude/:id", checkToken, PetController.concludeAdoption)

export default routerPet;
