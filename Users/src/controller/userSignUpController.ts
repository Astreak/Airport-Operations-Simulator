import { client } from "../config/ConnectDatabase";
var userSignUpController = (req: any, res: any) => {
    const username:string  = req.body.username;
    const firstName:string = req.body.firstName;
    const lastName:string  = req.body.lastName;
    const phone:string  = req.body.phone;
    const email:string  = req.body.email;
    const password: string  = req.body.password;
    const confirmpassword: string = req.body.confirmpassword;
    let listData = [username ,firstName, lastName, phone, email, password];
    if (password != confirmpassword)
        res.status(403).send("Password didn't matched");
    else {
        client.query('INSERT INTO "my_schema"."Users" (username,firstName,lastName, phone, email, password) VALUES ($1, $2, $3, $4, $5,$6)', listData)
            .then((d) => {
                console.log('[+] User is created');
                client.end();
                res.status(201).send("User is created");
            })
            .catch((e) => {
                console.log(e);
                client.end();
                res.status(500).send('Error');
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
                client.end();
                res.status(201).send("EmploymentDetails Created for the user");

            })
            .catch((e) => {
                console.log(e);
                client.end();
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
                client.end();
                res.status(201).send("EmploymentDetails Created for the user");

            })
            .catch((e) => {
                console.log(e);
                client.end();
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
                client.end();
                res.status(201).send("EmploymentDetails Created for the user");

            })
            .catch((e) => {
                console.log(e);
                client.end();
                res.status(500).send('Error');
            });

}
export { userSignUpController, createDriverEmplymentDetails, createAdminEmplymentDetails, createStaffEmplymentDetails };