// dependencies
const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

const uuidv1 = require('uuid/v1');

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

    // read db file (string)
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        // then parse data to array of objects
        const parseData = JSON.parse(data);

        // add new note to parsed data array and stringify
        const combineNotes = [...parseData, newNote];
        const userData = JSON.stringify(combineNotes);
     
        // write combineNotes string to db
        fs.writeFile(path.join(__dirname, "../db/db.json"), userData, (error, response) => {
            if (error) throw error;
            res.json({ ok: true });
        })
 
    })

})

router.delete("/api/notes/:id", (req,res) => {
    
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
        if (err) throw err;

        let userData = [];

        // get data array of objects
        data = JSON.parse(data);

        // loop through data array for NON-matching and build new array  
        for(i=0; i<data.length; i++){
            if (data[i].id !== req.params.id){
                userData.push(data[i]);
            }
        }
        // convert new array to string
        userData = JSON.stringify(userData);

        // write new string to db
        fs.writeFile(path.join(__dirname, "../db/db.json"), userData, (err, response) => {
            if (err) throw err;
            res.json({ ok: true });
        })
    })
})

module.exports = router;