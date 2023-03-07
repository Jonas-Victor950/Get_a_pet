import { Schema, model } from "mongoose";

const userSchema = new Schema<any>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    images: { type: Array, required: false },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "User",
  }
);

const User = model<any>("User", userSchema);

export { User };
