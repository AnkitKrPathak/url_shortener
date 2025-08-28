const express = require("express");
const cors = require("cors");
const urlRoutes = require("./Routes/urlRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("./Public")); //Serving frontend files

app.use("/api", urlRoutes);

module.exports = app;