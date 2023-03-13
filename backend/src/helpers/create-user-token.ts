import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const createUserToken = async (user: any, req: Request, res: Response) => {
  // Create a token
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "nossosecret"
  );

  // Return token
  res.status(200).json({
    message: "Você está autenticado",
    token: token,
    userId: user._id,
  });
};

export default createUserToken;
