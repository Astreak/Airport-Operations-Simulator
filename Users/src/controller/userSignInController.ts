import { client } from "../config/ConnectDatabase";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Randomstring  from "randomstring";
var userSignInController = (req: any, res: any) => {
    const username:string  = req.body.username;
    const password: string  = req.body.password;
    if (res.locals.userExists === 'No') {
        res.status(400).send({ "msg": "User not present" });
        return;
    }
    else {
        let listData = [ username ];
        client.query('SELECT username, password FROM "my_schema"."Users" WHERE username = $1', listData)
            .then((d) => {
                const userData = d.rows[0];
                bcrypt.compare(password, userData.password)
                    .then((result) => {
                        if (result == false) {
                            res.status(403).send({ "msg": "Wrong Password" });
                        } else {
                            let randomS: string = Randomstring.generate(55);
                            const token = jwt.sign({
                                email: userData.email,
                                username: userData.username
                            }, randomS, { expiresIn: '1hr' });
                            res.status(200).json({ token: token, userId: userData._id.toString() });
                        }
                    })
                    .catch((e) => {
                        console.log(e);

                    })
                
            })
            .catch((e) => {
                console.log(e);
                //client.end();
                res.status(500).send('Error');
            });
       
    }

}
export { userSignInController };