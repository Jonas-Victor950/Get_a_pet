import express from "express";
import routerUser from "./UserRoutes";
import routerPet from "./PetRoutes";
const router = express.Router();

router.use("/api/user", routerUser);
router.use("/api/pet", routerPet);

router.get("/", (req, res) => {
  res.send("API Working");
});

export default router;
