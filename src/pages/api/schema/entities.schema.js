import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  graduate: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  joining: {
    type: Date,
    required: true,
  },
  coordinates: {
    type: String,
    required: true,
  },
});

const User = models.Entitie || model("Entitie", userSchema);
export default User;
