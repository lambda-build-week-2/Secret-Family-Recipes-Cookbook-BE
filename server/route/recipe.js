import { Router } from 'express';
import RecipeController from '../controller/recipe';
import Token from '../helpers/token';
import Validator from '../middlewares/Validator';

const recipeRoute = Router();

recipeRoute.post('/recipe', Validator.validateRecipe, Token.verifyToken, RecipeController.createRecipe);
recipeRoute.put('/:recipeId/recipe', Token.verifyToken, RecipeController.modifyRecipe);
recipeRoute.delete('/:recipeId/recipe', Token.verifyToken, RecipeController.deleteRecipe);
recipeRoute.get('/recipes', RecipeController.getAllRecipes);
recipeRoute.post('/recipes/search', Token.verifyToken, RecipeController.searchRecipe);

export default recipeRoute;
