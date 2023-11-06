import { Router } from 'express';
import {cabdb, ridedb} from '../config/db';
import { checkDriverStatus, addDriverData } from '../middlewares/mid1';
import { createRideInfo } from '../controllers/rideinfo';
const userId = '6asdbasdxsadasXjasdnasd';
const from = 'Sector V';
const to = "Park Street";
const tripCost = 400;
var router = Router();
router.get('/', (req, res) => { // executes one middleware after another and both have access to the reponse and request object;
    res.send('Hello, this is the cab service REST API'); // w
});
/**
 * @description get request  to check driver status and book car
 */
router.put('/bookCab', checkDriverStatus, (req, res) => { 
    var driverName: String = '';
    if (res.locals.Id === null) {                                           // response.locals can store state throughout the life of request
        res.send('No Drivers are available right now.');
        return;
    }
    cabdb.findByIdAndUpdate(res.locals.Id, { onRide: true }, { new: true }) // new: true returns the updated document
        .then((selectedDriver) => {
            if (selectedDriver != null)
                driverName = selectedDriver.firstName + selectedDriver.lastName;
            return selectedDriver;
        })
        .catch((e) => {
            console.log('error');
            res.send('[-] Error: Driver Not Found');
        })
        .then((driver) => {
            let rideData = createRideInfo(driver?.id, userId, tripCost, from, to);
            ridedb.create(rideData)
            .then((d) => {
                console.log('Ride Data created');
                if (driver != null) {
                    driver.currentRideId = d._id.toString();
                    driver?.save();
                    console.log('currentRideInfo Updated');
                }
            })

        });
});
export { router };