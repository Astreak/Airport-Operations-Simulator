import express from "express";
import db from './src/config/db';
import app  from "./src/router/app";
var port = process.env.PORT || '5000';
app.get('/', (req, res) => {
    res.send('Hello, this is your Node.js server connected to MongoDB!');
});
app.get('/post',(req,res)=>{
    let obj = new db({
        "empId":'asdasdasd',
        "firstName":'John',
        "lastName": 'OP',
        "cabId": 'opasdasd',
        "isOccupied": 'NO',
        "onRide": 'YES'
    });
    obj.save()
        .then((doc)=>{
            console.log("Document Saved ",doc);
        }).catch((err)=>{
            console.log("Error ",err);
        })
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});