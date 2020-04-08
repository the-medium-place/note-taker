// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// express app
const app = express();
const PORT = 3000;

// express happ handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());













// HTML routes

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// data routes

app.get("/api/notes", (req, res) => {
    res.send("api test success");
    // const db = fs.readFile(path.join(__dirname, "./db/db.json"), err => !err ? console.log("Success") : console.log(err));
    // console.log(db);
    // res.send(db);

});








// start server, begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });