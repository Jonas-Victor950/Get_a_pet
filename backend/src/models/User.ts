import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  phone: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: false },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "User",
  }
);

const User = model<IUser>("User", userSchema);

export { User, IUser };
