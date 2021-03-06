import db from '../database/connection';

class Recipe {

  static async create(params, userId) {
    try {
      const {title, source, ingredients, category } = params;
      const insertQuery = `INSERT INTO recipes (userid, title, source, ingredients, category ) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const values = [ userId, title, source, ingredients, category ];
      const result = await db.query(insertQuery, values);
      return result.rows[0];

    } catch (err) {
      return false;
    }
  }
  static async getRecipeTitle(title) {
    try {
      const query = `SELECT * FROM recipes WHERE title = $1 `;
      const result = await db.query(query, [title]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  static async getRecipeById(recipeId) {
    try {
      const query = `SELECT * FROM recipes WHERE recipeId = $1 `;
      const result = await db.query(query, [recipeId]);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  static async modify(params, userId) {
    try {
      const {title, source, ingredients, category } = params;
      const modifyQuery = 'UPDATE recipes SET title = $1, source = $2, ingredients = $3, category = $4 WHERE userId = $5 RETURNING *';
      const values = [title, source, ingredients, category, userId];
      const result = await db.query(modifyQuery, values);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  static async delete(userId, recipeId) {
    try {
      const deleteQuery = `DELETE FROM recipes WHERE recipeid = $1 AND userid = $2 RETURNING *`
      const values = [recipeId, userId];
      const result = await db.query(deleteQuery, values);
      return result.rows[0];
    } catch (err) {
      return false;
    }
  }

  static async getAll() {
    try {
      const query = 'SELECT * FROM recipes';
      const result = await db.query(query);
      return result.rows;
    } catch (err) {
      return false;
    }
  }

  static async search(search) {
    try {
      const searchQuery = `SELECT * FROM recipes WHERE title = $1 OR category = $2`;
      const values = [search, search];
      const result = await db.query(searchQuery, values);
      return result.rows;
    }
    catch(err) {
      return false;
    }
  }
}

export default Recipe;
