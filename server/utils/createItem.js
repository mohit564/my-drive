const fs = require("fs").promises;
const path = require("path");

async function createItem(item) {
  if (item.type === "folder") {
    await fs.mkdir(path.join(__dirname, "../", item.path, item.name));
  } else {
    await fs.writeFile(path.join(__dirname, "../", item.path, item.name), "");
  }
}

module.exports = createItem;

createItem({ name: "test.txt", type: "file", path: "home/test" });
