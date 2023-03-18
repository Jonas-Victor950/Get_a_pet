import { Pet } from "../models/Pet";
import { Request, Response } from "express";
import ObjectId from "mongoose";

// Helpers
import getToken from "../helpers/get-token";
import getUserByToken from "../helpers/get-user-by-token";

const PetController = {
  async create(req: Request, res: Response) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    const available = true;

    // Images upload

    // Validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "A idade é obrigatória" });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso é obrigatório" });
      return;
    }
    if (!color) {
      res.status(422).json({ message: "A cor é obrigatória" });
      return;
    }

    if (images?.length === 0) {
      res.status(422).json({ message: "A imagem é obrigatória" });
      return;
    }

    // Get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    // Create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({
        message: "Pet cadastrado com sucesso!",
        newPet,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async getAll(req: Request, res: Response) {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({
      pets: pets,
    });
  },

  async getAllUserPets(req: Request, res: Response) {
    // Get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  },

  async getAllUserAdoptions(req: Request, res: Response) {
    // Get user from token
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    res.status(200).json({
      pets,
    });
  },

  async getPetById(req: Request, res: Response) {
    const id = req.params.id;

    if (!ObjectId.isValidObjectId(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    // Check if pet exists
    const pet = await Pet.findOne({ _id: id });

    if(!pet) {
      res.status(404).json({message: "Pet não encontrado!"})
    }

    res.status(201).json({
      pet: pet
    })
  },
};

export default PetController;
