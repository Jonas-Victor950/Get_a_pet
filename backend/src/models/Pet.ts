import { Schema, model } from "mongoose";

const petSchema = new Schema<any>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    images: { type: Array, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    available: { type: Boolean },
    user: Object,
    adopter: Object,
  },
  {
    timestamps: true,
    collection: "Pet",
  }
);

const Pet = model<any>("Pet", petSchema);

export { Pet };
