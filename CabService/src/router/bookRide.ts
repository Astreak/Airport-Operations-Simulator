import { Router } from 'express';
import { checkDriverStatus, addDriverData } from '../middlewares/mid1';
import { createRideInfo } from '../controllers/rideinfo';
import { bookRideController, pickupController, endRide } from '../controllers/bookRideController';
var bookCabRouter = Router();
bookCabRouter.get('/',(req, res) => { // executes one middleware after another and both have access to the reponse and request object;
    res.send('Hello, this is the cab service REST API'); // w
});
/**
 * @description get request  to check driver status and book car
 */
bookCabRouter.put('/bookRide', checkDriverStatus, bookRideController);
bookCabRouter.put('/pickup', pickupController);
bookCabRouter.put('/endRide', endRide);
export { bookCabRouter };