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
    for (let i = 0; i < 10; i++){
        listDriver.push({
            'firstName': 'ABC',
            'lastName': 'XYZ',
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
export { checkMiddle, anotherMiddle, addDriverData };