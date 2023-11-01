import express from "express";
import db from './src/config/db';
import app from "./src/router/app";
import { checkMiddle, anotherMiddle } from "./src/middlewares/mid1";
var port = process.env.PORT || '5000'; 
app.get('/', checkMiddle,anotherMiddle, (req, res) => { // executes one middleware after another and both have access to the reponse and request object;
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