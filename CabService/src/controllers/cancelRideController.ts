import express from 'express';
import { cabdb, ridedb } from '../config/db';
const userId = '6asdbasdxsadasXjasdnasd';
const from = 'Sector V';
const to = "Park Street";
const tripCost = 400;
const driverId = 'XYZ1';
var cancelRideCab = (req:any, res:any) => {
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
export { cancelRideCab };