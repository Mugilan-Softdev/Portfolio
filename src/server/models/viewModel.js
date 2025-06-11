import mongoose from 'mongoose';

const viewSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const viewModel = mongoose.models.viewers || mongoose.model("viewers",viewSchema);


export default viewModel;
