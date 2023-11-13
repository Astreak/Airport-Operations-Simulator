import { client } from "../config/ConnectDatabase";
let checkUserAlreadyPresent = async (req: any, res: any, next: any) => {
    let username = req.body.username;
    let email = req.body.email;
    let responseObjs: any = await client.query('Select Id, email, username  from "my_schema"."Users" WHERE username = $1 OR email = $2)', [username, email]);
    client.end();
    if (responseObjs.length == 0) {
        res.locals.userExists = 'No';
        next();
    } else {
        res.locals.userExists = 'Yes';
        next();
    }

}
export { checkUserAlreadyPresent, client };