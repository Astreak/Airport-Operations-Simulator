import { cabdb, ridedb } from '../config/db';
import { Redis } from 'ioredis';
const cacheServer = new Redis();
var checkMiddle = (res: any, req: any, next: any) => {
    console.log(res.body);
    let ok = 2;
    if (ok == 2) next();
    else return;
}
var anotherMiddle = (res: any, req: any, next: any) => {
    console.log("OK");
    next();
}
var addDriverData = (res: any, req: any, next: any) => {
    let listDriver = [];
    for (let i = 1; i <=90; i++){
        let ok = i & 1 ? '3.95' : '4.9';
        listDriver.push({
            'id':'XYZ'+i.toString(),
            'firstName': 'ABC',
            'lastName': 'XYZ'+i.toString(),
            'cabId': i.toString(),
            'onRide': false,
            'isAvailable': false,
            "userRating" :ok
        });
    }
    cabdb.create(listDriver)
        .then((d) => {
            //console.log(d);
            console.log('Driver data updated');
            next();
        })
        .catch((err) => {
            console.log(err);
        });
}
var deleteDrivers = async (req: any, res: any, next: any)=>{
    const result = await cabdb.deleteMany({ 'cabId': { $lt: 100 } });
    console.log(result);
    next();
}
var checkDriverStatus = async (req: any, res: any, next: any) => {
    try {
        // caching available drives for every location 
        let ifDriverPresent: any, isDriverAvailable: any, g:any; 
        ifDriverPresent = await cacheServer.get('driverData:1');;
        if (ifDriverPresent) {
            let driverData: any = cacheServer.blpop("driverData:1", 6000);
            if (driverData != null || driverData != undefined) {
                g = JSON.parse(driverData)[0];
            } else {
                g = null;
            }
        } else {
            g = await cabdb.find({ 'isAvailable': false });
        }
        if (g != null) res.locals.Id = g?._id;
        else res.locals.Id = null;
        next();
    } catch {
        res.locals.Id = null;
        next();
    }

}
export {checkDriverStatus, addDriverData};