var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// view engine setup

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// app.use(function (req,res,next) {
//                                          // authentication
// });

app.use('/', require('./routes'));

module.exports = app;
