import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
  {
    sentby: { type: String, required: true },
    title: { type: String, required: true, trim: true },  // title is now required
    image: { type: String, default: null }, // image is optional, defaulting to null
    description: { type: String, required: true, trim: true },  // description is now required
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Community = mongoose.model("community", communitySchema,"community");
export default Community;
