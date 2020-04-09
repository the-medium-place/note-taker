// dependencies

const express = require('express');
const router = express.Router();
const path = require("path");

// routes

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});


module.exports = router;