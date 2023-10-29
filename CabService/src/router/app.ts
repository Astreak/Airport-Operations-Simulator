import express, { Application } from 'express';
import mongoose from 'mongoose';
import db from '../config/db';
import 'dotenv/config'
const dbUri = process.env.DB_URI || 'None';
const port = process.env.PORT || 5000;
const connectDB: Promise<void> = mongoose.connect(dbUri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
} as any).then(()=>{
        console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
});
var app = express();
export default app;