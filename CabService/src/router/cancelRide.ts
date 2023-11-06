import { Router } from 'express';
import { cabdb, ridedb } from '../config/db';
const driverId = 'XYZ1';
const userId = '6asdbasdxsadasXjasdnasd';
var cancelRideRouter = Router();
// Driver cancels the ride
cancelRideRouter.put("/cancelRideCab", (req, res) => {
    cabdb.findOne({ id: driverId })
        .then((d) => {
            if (d != null) {
                d.onRide = false;
                d.save();
                ridedb.deleteOne({ driverId: driverId, pickup: false, active: true })
                    .then((d) => {
                        console.log('Ride record deleted');
                    })
                    .catch((e) => {
                        console.log('Error');
                    });
                res.send("The ride is cancelled");
            } else {
                throw new Error("Something went wrong");
            }
        })
        .catch((e) => {
            res.send("Error");
        });
});
cancelRideRouter.put("/cancelRideUser", (req, res) => {
    // to be implemented
});
export { cancelRideRouter };