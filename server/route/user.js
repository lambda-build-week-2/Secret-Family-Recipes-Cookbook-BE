import { Router } from 'express';
import UserController from '../controller/user';
import Validator from '../middlewares/Validator';

const authRoute = Router();

authRoute.post('/signup', Validator.validateSignUp, UserController.signup);
authRoute.post('/signin', Validator.validateSignin, UserController.signin);

export default authRoute;

