import jwt from "jsonwebtoken";
import { User } from "../models/User";

// get user by jwt token
const getUserByToken = async (token: any) => {
  if (!token) {
    return res.status(401).json({ message: "Acesso Negado!" });
  }

  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};

export default getUserByToken;
