const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/user");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT;

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected!");
    app.listen(port, "0.0.0.0", () => {
      console.log(`server is running  ${port}`);
    });
  })
  .catch((e) => {
    console.log("connection failed", e);
  });

app.get("/", (req, res) => {
  res.send("<h1>HELLO THIS GAME API</h1>");
});

app.post("/register", async (req, res) => {
  const { username } = req.body;

  try {
    const user = new User({ username });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/record-game", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $inc: { points: 1 } }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Game recorded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to record game" });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ score: -1 })
      .select("username points");
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve leaderboard" });
  }
});
