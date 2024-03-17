const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
require("dotenv").config();
const app = express();
app.use(cors());
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
  res.send("<h1>HELLO THIS  GAME API</h1>");
});

app.post("/register", async (req, res) => {
  const { username } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      // If user already exists, send back the points associated with the username
      return res
        .status(200)
        .json({ userName: user.username, points: user.points });
    }
    const newUser = new User({ username });
    await newUser.save();
    res
      .status(201)
      .json({ userName: newUser.username, points: newUser.points });
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
