import { client } from "../config/ConnectDatabase";
import bcrypt from 'bcrypt';
var userSignUpController = (req: any, res: any) => {
    let saltRounds = 10;

    const username:string  = req.body.username;
    const firstName:string = req.body.firstName;
    const lastName:string  = req.body.lastName;
    const phone:string  = req.body.phone;
    const email:string  = req.body.email;
    const password: string  = req.body.password;
    const confirmpassword: string = req.body.confirmpassword;
    if (res.locals.userExists === 'Yes') {
        res.status(404).send({ "msg": "User already exists" });
        return;
    }
    if (password != confirmpassword)
        res.status(403).send({ "msg": "Password didn't matched" });
    else {
        bcrypt.hash(password, saltRounds)
            .then(function (hashPassword) {
                let listData = [username, firstName, lastName, phone, email, hashPassword];
                client.query('INSERT INTO "my_schema"."Users" (username,firstName,lastName, phone, email, password) VALUES ($1, $2, $3, $4, $5,$6)', listData)
                    .then((d) => {
                        console.log('[+] User is created');
                        //client.end();
                        res.status(201).send({ "msg": "User is created" });
                    })
                    .catch((e) => {
                        console.log(e);
                        //client.end();
                        res.status(500).send('Error');
                    });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).send({ "msg": "Error in storing password" });
            });
       
    }

}
var createDriverEmplymentDetails = (req: any, res: any) => {
    const role:string  = 'driver'; 
    const yoe: Number = req.body.yoe; 
    const user_id: Number = req.body.user_id; // have to be handled from frontend;
    client.query('INSERT INTO "my_schema"."EmploymentDetails" (role, yoe, user_id) VALUES($1, $2, $3)', [role,yoe,user_id])
            .then((d) => {
                console.log('[+] EmployeeDetails Add');
                //client.end();
                res.status(201).send("EmploymentDetails Created for the user");

            })
            .catch((e) => {
                console.log(e);
                //client.end();
                res.status(500).send('Error');
            });

}
var createStaffEmplymentDetails = (req: any, res: any) => {
    const role:string  = 'staff'; 
    const yoe: Number = req.body.yoe; 
    const user_id: Number = req.body.user_id; // have to be handled from frontend;
    client.query('INSERT INTO "my_schema"."EmploymentDetails" (role, yoe, user_id) VALUES($1, $2, $3)', [role,yoe,user_id])
            .then((d) => {
                console.log('[+] EmployeeDetails Add');
                //client.end();
                res.status(201).send("EmploymentDetails Created for the user");

            })
            .catch((e) => {
                console.log(e);
                //client.end();
                res.status(500).send('Error');
            });

}
var createAdminEmplymentDetails = (req: any, res: any) => {
    const role:string  = 'admin'; 
    const yoe: Number = req.body.yoe; 
    const user_id: Number = req.body.user_id; // have to be handled from frontend;
    client.query('INSERT INTO "my_schema"."EmploymentDetails" (role, yoe, user_id) VALUES($1, $2, $3)', [role,yoe,user_id])
            .then((d) => {
                console.log('[+] EmployeeDetails Add');
                //client.end();
                res.status(201).send("EmploymentDetails Created for the user");

            })
            .catch((e) => {
                console.log(e);
                //client.end();
                res.status(500).send('Error');
            });

}
export { userSignUpController, createDriverEmplymentDetails, createAdminEmplymentDetails, createStaffEmplymentDetails };