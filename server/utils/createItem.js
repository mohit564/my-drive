const fs = require("fs").promises;
const path = require("path");

async function createItem(item) {
  const folderNameRegex = /^(\w+\.?)*\w+$/;
  const fileNameRegex = /^[^<>:;,?"*|/]+$/;
  try {
    if (item.type === "folder") {
      if (!item.name.match(folderNameRegex)) {
        throw new Error("Invalid folder name: " + item.name);
      }
      await fs.mkdir(path.join(__dirname, "../", item.path, item.name));
    } else {
      if (!item.name.match(fileNameRegex)) {
        throw new Error("Invalid file name: " + item.name);
      }
      await fs.writeFile(
        path.join(__dirname, "../", item.path, item.name),
        "",
        { flag: "wx" },
        function (err) {
          throw new Error("File already exists: " + path.join(item.name));
        }
      );
    }
  } catch (error) {
    if (error.message.includes("EEXIST")) {
      error.message =
        "Item already exists: " +
        error.message.slice(error.message.indexOf("'"));
    }
    return error.message;
  }
}

module.exports = createItem;
