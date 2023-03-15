import mongoose from "mongoose";
import { Request, Response } from "express";
import Logger from "../database/logger";
import { IUser, User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// helpers
import createUserToken from "../helpers/create-user-token";
import getToken from "../helpers/get-token";
import getUserByToken from "../helpers/get-user-by-token";

const UserController = {
  async register(req: Request, res: Response) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (password != confirmpassword) {
      res
        .status(422)
        .json({ message: "A senha e a confirmação precisam ser iguais!" });
      return;
    }

    // check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    // check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(422)
        .json({ message: "Não há usuário cadastrado com este e-mail!" });
      return;
    }

    // check if password matches with db password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida!" });
      return;
    }

    await createUserToken(user, req, res);
  },

  async checkUser(req: Request, res: Response) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);

      currentUser?.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  },

  async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ user });
  },

  async editUser(req: Request, res: Response) {
    const id = req.params.id;

    // Check if user exists
    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmpassword } = req.body;

    let image = "";

    // validations
    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório!" });
      return;
    }

    // Check if email has already taken
    const userExists = await User.findOne({ email: email });

    if (user?.email !== email && userExists) {
      res.status(422).json({ message: "Por favor, utilize outro email!" });
      return;
    }

    user?.email = email;

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória!" });
      return;
    }

    if (!confirmpassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }
  },
};

export default UserController;
