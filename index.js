const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connection");
const urlRoutes = require("./routes/url");
const staticRouter = require("./routes/staticRouter");

const app = express();
const PORT_NUMBER = 8000;

connectMongoDb("mongodb://localhost:27017/short-url");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoutes);
app.use("/", staticRouter);

// set EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT_NUMBER, () =>
  console.log(`Server started at port ${PORT_NUMBER}`)
);
