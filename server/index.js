import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import * as UserController from "./controllers/UserController.js";
import checkAuth from "./utils/checkAuth.js";

import * as HabitController from "./controllers/HabitController.js";
import * as CompletionController from "./controllers/CompletionController.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB (Docker)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Habit Tracker API is running (ES6 Modules)...");
});

app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.get("/users/:id", checkAuth, UserController.getMe);
app.patch("/users/me", checkAuth, UserController.update);

app.get("/habits", checkAuth, HabitController.getAll);
app.post("/habits", checkAuth, HabitController.create);
app.delete("/habits/:id", checkAuth, HabitController.remove);

app.get("/completions", checkAuth, CompletionController.getAll);
app.post("/completions", checkAuth, CompletionController.create);
app.delete("/completions/:id", checkAuth, CompletionController.remove);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
