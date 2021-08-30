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

module.exports = getFiles;
