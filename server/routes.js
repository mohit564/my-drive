const express = require("express");
const fs = require("fs");
const path = require("path");

// configure router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to My Drive project API. Created by Mohit Dhule.");
});

router.get("/api/users/:user", (req, res) => {
  const user = req.params.user;
  const target = path.join(__dirname, "home", user);
  const items = [];

  fs.readdir(target, { withFileTypes: true }, (err, data) => {
    if (err) {
      return res.status(404).json({ error: "User does not exist" });
    }

    data.forEach((item) =>
      items.push({
        name: item.name,
        type: item.isDirectory() ? "folder" : "file",
        ext: path.extname(item.name),
      })
    );
    res.json(items);
  });
});

module.exports = router;
