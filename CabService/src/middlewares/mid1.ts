import db from '../config/db';
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
    for (let i = 100; i < 120; i++){
        listDriver.push({
            'firstName': 'ABC',
            'lastName': 'XYZ'+i.toString(),
            'cabId': i.toString(),
            'onRide': false,
            'isOccupied': false
        });
    }
    db.create(listDriver)
        .then((d) => {
            console.log(d);
            console.log('Driver data updated');
            next();
        })
        .catch((err) => {
            console.log(err);
        });
}
var deleteDrivers = async (req: any, res: any, next: any)=>{
    const result = await db.deleteMany({ 'cabId': { $lt: 100 } });
    console.log(result);
    next();
}
var checkDriverStatus = async (req: any, res: any, next: any) => {
    try {
        let g = await db.findOne({ 'isOccupied': false })
        res.locals.Id = g?._id;
        next();
    } catch {
        res.locals.Id = null;
        next();
    }

}
export {checkDriverStatus};