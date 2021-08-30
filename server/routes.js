const express = require("express");
const path = require("path");
const getFiles = require("./getFiles");

// configure router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to My Drive project API. Created by Mohit Dhule.");
});

router.get("/api/users/:user", async (req, res) => {
  const USER = req.params.user;
  const USER_DIRECTORY = path.join(__dirname, "home", USER);

  try {
    const files = await getFiles(USER_DIRECTORY);
    res.json(files);
  } catch {
    res.json({ error: `User ${USER} not found` });
  }
});

module.exports = router;
