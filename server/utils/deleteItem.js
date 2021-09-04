const fs = require("fs").promises;
const path = require("path");

async function deleteItem(item) {
  try {
    await fs.rm(path.join(__dirname, "../", item.path, item.name), {
      recursive: true,
    });
  } catch (error) {
    return Error(`Item not found: '/${path.join(item.path, item.name)}'`);
  }
}

module.exports = deleteItem;
