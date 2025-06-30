import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
    },
    image: {
      type: String,
      required: [true, "Please provide a project image URL"],
    },
    technologies: {
      type: [String],
      required: [true, "Please provide at least one technology"],
    },
    liveUrl: {
      type: String,
      required: [true, "Please provide a live demo URL"],
    },
    githubUrl: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "Please provide a project category"],
      enum: ["Web Development", "Full Stack", "Mobile", "UI/UX"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
