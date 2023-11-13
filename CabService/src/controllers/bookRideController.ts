import express from 'express';
import { createRideInfo } from '../controllers/rideinfo';
import { cabdb, ridedb } from '../config/db';
const userId = '6asdbasdxsadasXjasdnasd';
const from = 'Sector V';
const to = "Park Street";
const tripCost = 400;
const driverId = 'XYZ1';
let bookRideController =  (req:any, res:any) => { 
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
                        res.send(`${driverName} is your driver, he would pick you up from ${from} to your destination to ${to}`);
                    }
                }).catch((e) => {
                    console.log('Error');
                    res.send('Something is not working, will get back to you');
                })

        });
}
let pickupController = (req:any, res:any) => {
    // get the current driver ID and remove the hardcoded one
    ridedb.findOne({ driverId: driverId, active: true })
        .then((d) => {
            if (d != null) {
                d.pickup = true;
                d?.save();
                res.send("Driver have picked you up");
            } else {
                res.send("Something went wrong");
            }
        })
        .catch((e) => {
            res.send("Error");
        })
} 
export { bookRideController, pickupController };