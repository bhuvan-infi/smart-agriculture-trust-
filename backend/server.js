// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import Idea from "./models/Idea.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.post("/register", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = new User({ name, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful!" });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/submit-idea", async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const idea = new Idea({ name, title, description });
    await idea.save();
    res.status(201).json({ message: "Idea submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit idea" });
  }
});

app.get("/", (req, res) => {
  res.send("Smart Agriculture Trust Backend is running 🚀");
});

app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));
