import express from 'express';
import { Client } from 'pg';
import "dotenv/config";
import { signUpRouter } from './src/routes/userSignUp';
import { signInRouter } from './src/routes/userSignIn';
import { bookTicketRouter } from './src/routes/bookTickets';
const port:string | undefined = process.env.PORT || '3000';
const app = express();
app.use(express.json());
app.use(signUpRouter);
app.use(signInRouter);
app.listen(port, () => {
    console.log(`[+] Server Connected on ${port}`)
});
