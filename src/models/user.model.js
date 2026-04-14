import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, min: 8, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export { User };
