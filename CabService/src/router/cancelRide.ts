import { Router } from 'express';
import { cabdb, ridedb } from '../config/db';
import { cancelRideCab, cancelRideUser } from '../controllers/cancelRideController';
var cancelRideRouter = Router();
// Driver cancels the ride
cancelRideRouter.put("/cancelRideCab", cancelRideCab);
cancelRideRouter.put("/cancelRideUser", cancelRideUser );
export { cancelRideRouter };