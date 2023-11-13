import express, { response } from 'express';
import { cabdb, ridedb } from '../config/db';
import { setDriverInactive, getDriverIdUserCancellation} from '../middlewares/deleteRideInfo';

type cVoid = string | void;
var cancelRideCab = async (req: any, res: any) => {
    // get the current driver ID and remove the hardcoded one
    console.log(req.body);
    let responseMessage:any = await setDriverInactive(req.body.driverId);
    if (responseMessage == '0')
        res.status(201).send('Your Ride has been cancelled');
    else
        res.status(504).send('Server Error :(');
}
var cancelRideUser = async (req: any, res: any) => {
    const userId = req.body.userId;
    let getDriverID: cVoid = await getDriverIdUserCancellation(req.body.userId);
    let responseMessage: string | void = await setDriverInactive(getDriverID);
    console.log(responseMessage);
    if (responseMessage == '0')
        res.status(201).send('Your Ride has been cancelled');
    else
        res.status(504).send('Server Error :(');
    
}
export { cancelRideCab, cancelRideUser };