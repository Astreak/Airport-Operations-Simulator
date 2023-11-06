import { Router } from 'express';
import db from '../config/db';
import { checkDriverStatus } from '../middlewares/mid1';

var router = Router();
router.get('/', (req, res) => { // executes one middleware after another and both have access to the reponse and request object;
    res.send('Hello, this is the cab service api');
});
/**
 * @description get request  to check driver status and book car
 */
router.put('/bookCab', checkDriverStatus, (req, res) => { 
    if (res.locals.Id === null) {                                           // response.locals can store state throughout the life of request
        res.send('No Drivers are available right now.');
        return;
    }
    db.findByIdAndUpdate(res.locals.Id ,{isOccupied :true},{new: true}) // new: true returns the updated document
        .then((d) => {
            console.log(d);
            res.send(`Cab with name ${d?.firstName} ${d?.lastName} with employee Id ${d?._id} is on the way`);
        })
        .catch((e) => {
            console.log('error');
            res.send('Error');
        });
});
//OTP logic have to be implemented
router.put('/endRide', (req, res) => {
    
});
export { router };