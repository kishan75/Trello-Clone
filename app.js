var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

// view engine setup

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
require("dotenv").config();

app.use("/", require("./routes"));

module.exports = app;
