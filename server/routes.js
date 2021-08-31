const express = require("express");
const path = require("path");
const getItems = require("./utils/getItems");
const createItem = require("./utils/createItem");

// configure router
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to My Drive project API. Created by Mohit Dhule.");
});

router.get("/api/users/:user", async (req, res) => {
  const USER = req.params.user;
  const USER_DIRECTORY = path.join(__dirname, "home", USER);

  try {
    const files = await getItems(USER_DIRECTORY);
    res.json(files);
  } catch {
    res.status(404).json({ error: `User ${USER} not found` });
  }
});

router.post("/api/users/:user", (req, res) => {
  const item = req.body;
  if (!item.name || !item.type || !item.path) {
    return res
      .status(400)
      .json({ error: "Item name, type and path is required" });
  }
  createItem(item);
  res
    .status(201)
    .json({ message: `${item.name} ${item.type} created successfully` });
});

module.exports = router;
