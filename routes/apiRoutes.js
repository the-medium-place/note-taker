// dependencies
const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
// const util = require("util");

// const readFileAsync = util.promisify(fs.readfile);




router.get("/api/notes", (req, res) => {

    
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function(err, data) {
        if (err){
            console.log(err)
        } else {
        console.log(data);
        res.json(data);
        }
    })


    // readFileAsync("db/db.json", "utf8").then(notes => res.json(notes));

    // readFileAsync((path.join("../db/db.json"), "utf8"), function(response){
    //     console.log(response);

    //     res.send(response);


    // })
    // .catch(err => console.log(err))


});



module.exports = router;