// dependencies
const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const util = require("util");

const uuidv1 = require('uuid/v1');


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


let notesUpdate;

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
    newNote.id = uuidv1();
    console.log(req.body);

    // read db.json for existing data
    readFileAsync(path.join(__dirname, "../db/db.json"), "utf8")
    .then(data => {
        // then parse into readable array of objects
            const parseData = JSON.parse(data);
        // add new note to parsed data array
            const combineNotes = [...parseData, newNote];
        // set global variable equal to string of updated data
            notesUpdate = JSON.stringify(combineNotes);

        })
        // then write updated string to db.json
        .then(() => writeFileAsync(path.join(__dirname, "../db/db.json"), notesUpdate))
        // then display JSON info
        .then(() => res.json(notesUpdate))
        .catch(err => !err ? console.log("success") : console.log(err));

})



router.delete("/api/notes/:id", (req,res) => {
    // const choice = req.params.id;
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {

        if (err) throw err;

        let userData = [];

        data = JSON.parse(data);
        console.log(data);

        for(i=0; i<data.length; i++){
            if (data[i].id !== req.params.id){
                console.log(data[i])
                userData.push(data[i]);
            }
        }
        console.log("after for loop" + userData);
        userData = JSON.stringify(userData);

        fs.writeFile(path.join(__dirname, "../db/db.json"), userData, (err, response) => {
            if (err) throw err;
            res.json({ ok: true });
        })
        


        // data = data.filter(note => note.id !== req.params.id)

    })



})



module.exports = router;