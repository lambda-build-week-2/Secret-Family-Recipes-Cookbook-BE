import { Router } from 'express';
import authRoute from './user';

const apiRoute = Router();

apiRoute.use('/auth', authRoute);

export default apiRoute;
