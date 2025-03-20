import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
  });
  
const Contact = mongoose.model("contacts", ContactSchema);
export default Contact;