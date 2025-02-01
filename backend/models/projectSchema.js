import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  category: { type: String, required: true }, 
  name: { type: String, required: true }, 
  visualizationType: { type: String, required: true },
  description: {type: String, required: true},
  data: [
    {
      name: { type: String, required: true }, // e.g., month names
      value: { type: Number, required: true }, // e.g., value for that month
    },
  ], 
},{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

export default mongoose.model("Project", projectSchema);
