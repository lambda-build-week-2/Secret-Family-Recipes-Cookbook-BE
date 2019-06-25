import { Router } from 'express';
import UserController from '../controller/user';
import Validator from '../middlewares/Validator';

const authRoute = Router();

authRoute.post('/signup', Validator.validateSignup, UserController.signup);

export default authRoute;