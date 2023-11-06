import express, { Application } from 'express';
import mongoose from 'mongoose';
import db from './src/config/db';
import { checkDriverStatus } from "./src/middlewares/mid1";
import 'dotenv/config'
const dbUri = process.env.DB_URI || 'None';
const port = process.env.PORT || '5000'; 
const connectDB: Promise<void> = mongoose.connect(dbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
} as any).then(()=>{
        console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
});
var app = express();
app.get('/', (req, res) => { // executes one middleware after another and both have access to the reponse and request object;
    res.send('Hello, this is your Node.js server connected to MongoDB!');
});
/**
 * @description get request  to check driver status and book car
 */
app.put('/bookCab', checkDriverStatus, (req, res) => { 
    if (res.locals.Id === null) {                                           // response.locals can store state throughout the life of request
        res.send('No Drivers are available right now');
        return;
    }
    db.findByIdAndUpdate(res.locals.Id ,{isOccupied :true},{new: true}) // new: true returns the updated document
        .then((d) => {
            console.log(d);
            res.send(`Cab with name ${d?.firstName} ${d?.lastName} with employee Id ${d?._id} is on the way`);
        })
        .catch((e) => {
            console.log('error');
            res.send('Error');
        });
});
//OTP logic have to be implemented
app.put('/endRide', (req, res) => {
    
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});