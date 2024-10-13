const http = require("http");
const express = require("express");
const server = express();
const app = http.createServer(server);

const mongoose = require("mongoose");
const customEnv = require("custom-env");
// customEnv.env(process.env.NODE_ENV, "./config");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true, limit: "25mb" }));
server.use(express.json());

const cors = require("cors");
server.use(cors());

const routes = require('./routes.js');
server.use("/api/", routes);

const path = require("path");
server.use(express.static(path.join(__dirname, "public")));

app.listen(process.env.PORT);
