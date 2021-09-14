const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const ORIGIN = process.env.ORIGIN || "*";

// configure app
const app = express();
app.set("port", PORT);
app.set("env", NODE_ENV);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: ORIGIN }));
app.use("/", routes);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(
    `Express Server started on Port ${app.get(
      "port"
    )} | Environment : ${app.get("env")}`
  );
});
