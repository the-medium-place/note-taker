// dependencies
const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const util = require("util");

// const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


let notesUpdate = "";

router.get("/api/notes", (req, res) => {

    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {

        if (err) {
            console.log(err)
        } else {

            const parseData = JSON.parse(data);
            res.send(parseData);
        }
    })

});


router.post("/api/notes", (req, res) => {
    const newNote = req.body;
    // let notesUpdate = "";


    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
        .then(data => {
            const parseData = JSON.parse(data);
            const combineNotes = [...parseData, newNote];
          

            // console.log("before " + notesUpdate);
            notesUpdate += JSON.stringify(combineNotes);
            // console.log("after " + notesUpdate);
            // notesUpdate += combineNotes;
        })
        .then(() => writeFileAsync(path.join(__dirname, "../db/db.json"), notesUpdate))
        .then(() => console.log("after then " + notesUpdate))
        .catch(err => !err ? console.log("success") : console.log(err));

})



module.exports = router;