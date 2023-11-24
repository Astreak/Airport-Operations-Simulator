import express from 'express';
import { client } from '../config/ConnectDatabase';
import { checkIfSeatsAvailable } from '../middleware/checkUserValidity';
const bookTicketRouter = express.Router();
bookTicketRouter.post("/bookTickets",checkIfAvailable, );
export { bookTicketRouter };