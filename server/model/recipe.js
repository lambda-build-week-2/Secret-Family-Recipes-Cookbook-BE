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
}

export default Recipe;
