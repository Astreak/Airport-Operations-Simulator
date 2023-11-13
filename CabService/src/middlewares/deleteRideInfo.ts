import express from 'express';
import { cabdb, ridedb } from '../config/db';
const userId = '6asdbasdxsadasXjasdnasd';
const from = 'Sector V';
const to = "Park Street";
const tripCost = 400;
const driverId = 'XYZ1';
// Make the current Driver activity setup to inactive
enum SuccessInfo{ SUCCESS = '0', FAILURE = '1'}
let setDriverInactive = (driverId:string): Promise<SuccessInfo | void> => {
      return cabdb.findOne({id: driverId})
        .then((d) => {
            if (d != null) {
                d.onRide = false;
                d.save();
                ridedb.deleteOne({ driverId: driverId, pickup: false, active: true }) // returns deleteResult object
                    .then((d) => {
                        console.log('Ride record deleted');
                        return SuccessInfo.SUCCESS;
                    })
                    .catch((e) => {
                        console.log(e);
                        return SuccessInfo.FAILURE;
                    });
                //res.send("The ride is cancelled");
            } else {
                throw new Error("Something went wrong");
                //return SuccessInfo.FAILURE;
            }
        })
        .catch((e) => {
            console.log(e);
            return SuccessInfo.FAILURE;
            //next();
        });    
}
let getDriverIdUserCancellation = (userId:string): Promise<string | undefined > => {
         return ridedb.findOne({ customerId: userId, pickup: false, active: true })
            .then((d) => {
                console.log('[+] Driver record is found ');
                console.log(d);
                return d?.driverId;
            })
            .catch((e) => {
                console.log(e);
                return '-1';
            });
}
export {setDriverInactive, getDriverIdUserCancellation};