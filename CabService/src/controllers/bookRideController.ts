import express from 'express';
import { createRideInfo } from '../controllers/rideinfo';
import { cabdb, ridedb } from '../config/db';
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
            let rideData = createRideInfo(driver?.id, req.body.userId, req.body.tripCost, req.body.from, req.body.to);
            ridedb.create(rideData)
                .then((d) => {
                    console.log('Ride Data created');
                    if (driver != null) {
                        driver.currentRideId = d._id.toString();
                        driver?.save();
                        console.log('currentRideInfo Updated');
                        res.send(`${driverName} is your driver, he would pick you up from ${req.body.from} to your destination to ${req.body.to}`);
                    }
                }).catch((e) => {
                    console.log('Error');
                    res.send('Something is not working, will get back to you');
                })

        });
}
let pickupController = (req:any, res:any) => {
    // get the current driver ID and remove the hardcoded one
    ridedb.findOne({ driverId: req.body.driverId, active: true })
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
let endRide = (req: any, res: any): any => {
    ridedb.findOne({ driverId: req.body.driverId, active: true, pickup: true })
        .then((d) => {
            if (d != null) {
                d.active = false;
                d?.save();
                cabdb.findOne({id: req.body.driverId})
                    .then((d) => {
                        if (d != null) {
                            d.onRide = false;
                            d.save();
                            res.status(201).send("The ride is has been completed");
                        } else {
                            res.status(404).send("You haven't  yet picked up the customer ");
                            //return SuccessInfo.FAILURE;
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                        res.status(504).send("Server Error :)");
                        //next();
                    }); 
            } else {
                
            }
        })
        .catch((e) => {
            res.status(504).res.send("You haven't  yet picked up the customer ");
        });
     
}
export { bookRideController, pickupController, endRide };