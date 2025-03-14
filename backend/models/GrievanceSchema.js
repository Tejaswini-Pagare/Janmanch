import mongoose from "mongoose";

const GrievanceSchema = new mongoose.Schema(
  {
    submissionType: {
      type: String,
      enum: ["Grievance", "Suggestion"],
      required: true,
    },
    category: {
      type: String,
      enum: ["Roads", "Water", "Power", "Sanitation"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
    userid: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Grievance = mongoose.model("grievance", GrievanceSchema, "grievance");
export default Grievance;
