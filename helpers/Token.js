import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secretKey = process.env.SECRET || 'ANYTHING';

class Token {
  static async create(payload) {
    const token = await jwt.sign(payload, secretKey);
    return token;
  }
}

export default Token;
