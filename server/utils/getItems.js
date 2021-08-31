const fs = require("fs").promises;
const path = require("path");

// Recursively collect all files and directories information
async function getItems(folderName) {
  let files = [];
  const dirents = await fs.readdir(folderName, { withFileTypes: true });

  for (const dirent of dirents) {
    files.push({
      name: dirent.name,
      type: dirent.isDirectory() ? "folder" : "file",
      ext: path.extname(dirent.name).slice(1),
      path: path.relative(path.join(__dirname, "../"), folderName),
    });
    if (dirent.isDirectory()) {
      files = files.concat(await getItems(path.join(folderName, dirent.name)));
    }
  }

  return files;
}

module.exports = getItems;
