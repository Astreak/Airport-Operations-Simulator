import express from 'express';
import { client } from '../config/ConnectDatabase';
const bookTicketRouter = express.Router();
bookTicketRouter.post("/bookTickets");
export { bookTicketRouter };