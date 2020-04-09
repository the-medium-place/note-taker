// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// express app
const app = express();
var PORT = process.env.PORT || 3000;

// express happ handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



// HTML routes
const htmlRoutes = require("./routes/htmlRoutes");
app.use(htmlRoutes);

// data routes
const apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);

// start server, begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });