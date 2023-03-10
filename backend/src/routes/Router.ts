import express from "express";
import routerUser from "./UserRoutes";
const router = express.Router();

router.use("/api/user", routerUser);

router.get("/", (req, res) => {
  res.send("API Working");
});

export default router;
