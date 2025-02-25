import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Project name
  visualizationType: { type: String, required: true }, // ✅ Visualization type
  category: { type: String, required: true }, // ✅ Category
  description: { type: String, required: true }, // ✅ Description
  startDate: { type: String, required: true }, // ✅ Start date
  data: [
    {
      name: { type: String, required: true }, // ✅ Data point name
      value: { type: Number, required: true }, // ✅ Data point value
    },
  ],
  corporator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Corporator",
    required: true,
  }, // this will link to the corporator who created it
});

export const Project = mongoose.model("Project", projectSchema);
