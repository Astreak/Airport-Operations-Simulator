import express from 'express';
import { checkUserAlreadyPresent } from '../middleware/checkUserValidity';
import {userSignUpController, createAdminEmplymentDetails, createStaffEmplymentDetails, createDriverEmplymentDetails} from '../controller/userSignUpController';
const signUpRouter = express.Router();
signUpRouter.post('/signUp/', checkUserAlreadyPresent,userSignUpController);
signUpRouter.post('/signUp/employmentDetails/drivers', createDriverEmplymentDetails,);
signUpRouter.post('/signUp/employmentDetails/staff', createStaffEmplymentDetails);
signUpRouter.post('/signUp/employmentDetails/admin', createAdminEmplymentDetails);
export { signUpRouter };
