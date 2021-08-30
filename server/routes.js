const express = require("express");
const fs = require("fs").promises;
const path = require("path");

// Recursively collect all files and directories information
async function getFiles(folderName) {
  let files = [];
  const dirents = await fs.readdir(folderName, { withFileTypes: true });

  for (const dirent of dirents) {
    files.push({
      name: dirent.name,
      type: dirent.isDirectory() ? "folder" : "file",
      ext: path.extname(dirent.name).slice(1),
    });
    if (dirent.isDirectory()) {
      files = files.concat(await getFiles(path.join(folderName, dirent.name)));
    }
  }

  return files;
}

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
