const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB Connection (local)
mongoose
  .connect("mongodb://127.0.0.1:27017/docnest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected to DocNest DB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 DocNest backend is running with MongoDB!");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
