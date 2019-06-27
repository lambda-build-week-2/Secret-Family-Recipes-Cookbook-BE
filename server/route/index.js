import { Router } from 'express';
import authRoute from './user';
import recipeRoute from './recipe';

const apiRoute = Router();

apiRoute.use('/', recipeRoute);
apiRoute.use('/auth', authRoute);

export default apiRoute;
