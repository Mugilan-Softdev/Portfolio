import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    googleId: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
