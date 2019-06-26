import { Router } from 'express';
import UserController from '../controller/user';
import signupValidator from '../middlewares/signup';
import signinValidator from '../middlewares/signin';


const authRoute = Router();

authRoute.post('/signup', signupValidator, UserController.signup);
authRoute.post('/signin', signinValidator, UserController.signin);

export default authRoute;

