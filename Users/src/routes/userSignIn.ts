import express from 'express';
import { checkUserAlreadyPresent } from '../middleware/checkUserValidity';
import { userSignInController } from '../controller/userSignInController';
const signInRouter = express.Router();
signInRouter.post('/signIn/', checkUserAlreadyPresent,userSignInController);
export { signInRouter };
