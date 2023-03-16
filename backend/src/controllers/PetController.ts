import { Pet } from "../models/Pet";
import { Request, Response } from "express";

const PetController = {
  async create(req: Request, res: Response) {
    res.json({ message: "Deu certo!" });
  },
};

export default PetController;
