import express, { Application } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import { bookCabRouter } from './src/router/bookRide';
import { cancelRideRouter } from './src/router/cancelRide';
const dbUri = process.env.CAB_DB_URI || 'None';
const port = process.env.PORT || '5000';
// CabDrivers Database 
const connectDB: Promise<void> = mongoose.connect(dbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
} as any).then(()=>{
        console.log("[+MongoDB] CabServiceDatabase Connected");
}).catch((err)=>{
    console.log(err);
});
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bookCabRouter);
app.use(cancelRideRouter);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});