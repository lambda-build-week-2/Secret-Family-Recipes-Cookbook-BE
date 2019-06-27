import { Router } from 'express';
import RecipeController from '../controller/recipe';
import Token from '../helpers/token';
import Validator from '../middlewares/Validator';

const recipeRoute = Router();

recipeRoute.post('/recipe', Validator.validateRecipe, Token.verifyToken, RecipeController.createRecipe);
recipeRoute.put('/:recipeId/recipe', Token.verifyToken, RecipeController.modifyRecipe);

export default recipeRoute;
