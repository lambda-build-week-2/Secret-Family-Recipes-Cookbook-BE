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
}

export default RecipeController;
