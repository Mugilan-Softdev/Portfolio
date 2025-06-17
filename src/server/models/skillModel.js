import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Frontend", "Backend", "Database", "Tools"
    icon: { type: String, required: true }, // SVG string or icon name
    color: { type: String, required: true }, // Tailwind color class
  },
  {
    timestamps: true,
  }
);

const skillModel =
  mongoose.models.skills || mongoose.model("skills", skillSchema);

export default skillModel;
