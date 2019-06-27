import recipeModel from '../model/recipe';
import Response from '../helpers/resp';

class RecipeController {
  static async createRecipe(req, res) {
    const {title, source, ingredients, category } = req.body;
    const {userId} = req.decoded;
    const params = {
      title,
      source,
      ingredients,
      category
    }
    const findRecipe = await recipeModel.getRecipeTitle(title);
    if (findRecipe) return Response.error(res, 400, 'This recipe title exists before.');
    const recipe = await recipeModel.create(params, userId);
    if (!recipe) return Response.error(res, 500, 'internal server error');
    return Response.success(res, 201, recipe);
  }

  static async modifyRecipe(req, res) {
    const {title, source, ingredients, category } = req.body;
    const {userId} = req.decoded;
    const { recipeId } = req.params;

    const recipe = await recipeModel.getRecipeById(recipeId);
    if (!recipe) return Response.error(res, 400, 'cannot find that recipe');
    if (userId !== recipe.userid) return Response.error(res, 401, 'you cannot modify another user\'s recipe');
    const params = {
      title: title || recipe.title,
      source: source || recipe.source,
      ingredients: ingredients || recipe.ingredients,
      category: category || recipe.category
    }
    const updatedRecipe = await recipeModel.modify(params, userId);
    if(!updatedRecipe) return Response.error(res, 500, 'internal server error!');
    return Response.success(res, 200, updatedRecipe);

  }

  static async deleteRecipe(req, res) {
    const {userId} = req.decoded;
    const { recipeId } = req.params;

    const recipe = await recipeModel.getRecipeById(recipeId);
    if (!recipe) return Response.error(res, 400, 'cannot find that recipe');
    if (userId !== recipe.userid) return Response.error(res, 401, 'you cannot delete another user\'s recipe');

    const recipeDeleted = await recipeModel.delete(userId, recipeId);
    if(!recipeDeleted) return Response.error(res, 500, 'internal server error!');
    return Response.success(res, 200, recipeDeleted);
  }
}

export default RecipeController;
