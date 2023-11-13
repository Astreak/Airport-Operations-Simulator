import express, { response } from 'express';
import { cabdb, ridedb } from '../config/db';
import { setDriverInactive, getDriverIdUserCancellation} from '../middlewares/deleteRideInfo';
const userId = '6asdbasdxsadasXjasdnasd';
const from = 'Sector V';
const to = "Park Street";
const tripCost = 400;
const driverId = 'XYZ1';
type cVoid = string | void;
var cancelRideCab = async (req: any, res: any) => {
    // get the current driver ID and remove the hardcoded one
    let responseMessage:any = await setDriverInactive(driverId);
    if (responseMessage == '0')
        res.status(201).send('Your Ride has been cancelled');
    else
        res.status(504).send('Server Error :(');
}
var cancelRideUser = async (req: any, res: any) => {
    let getDriverID: cVoid = await getDriverIdUserCancellation(userId);
    let responseMessage: string | void = await setDriverInactive(getDriverID);
    console.log(responseMessage);
    if (responseMessage == '0')
        res.status(201).send('Your Ride has been cancelled');
    else
        res.status(504).send('Server Error :(');
    
}
export { cancelRideCab, cancelRideUser };