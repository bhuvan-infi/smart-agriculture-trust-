// backend/models/Idea.js
import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;
