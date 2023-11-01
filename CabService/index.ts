import express from "express";
import db from './src/config/db';
import app from "./src/router/app";
import { checkMiddle, anotherMiddle, addDriverData } from "./src/middlewares/mid1";
var port = process.env.PORT || '5000'; 
app.get('/', checkMiddle,anotherMiddle, (req, res) => { // executes one middleware after another and both have access to the reponse and request object;
    res.send('Hello, this is your Node.js server connected to MongoDB!');
});
/**
 * @description get request  to check driver status
 */
app.get('/checkDriverStatus', (req, res) => {
    db.findOne({ 'isOccupied': false })
        .then((d) => {
            console.log(d);
            res.send(`${d?.firstName} is your driver`);
        })
        .catch((err) => {
            res.send('No Driver found');
        })
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});