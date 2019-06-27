import jwt from 'jsonwebtoken';
import Response from './resp';

const secret = process.env.SECRET_KEY || 'ERRORKEY';

class Token {
  static async createToken(payload) {
    const token = await jwt.sign(payload, secret);
    return token;
  }

  static async verifyToken(req, res, next) {
    const { authorization } = req.headers;
    if (typeof authorization === 'undefined') {
      return Response.error(res, 400, 'No token provided!');
    }
    const verifiedToken = await jwt.verify(authorization, secret);
    if (!verifiedToken) {
      return Response.error(res, 401, 'Token cannot be verified');
    }
    req.decoded = verifiedToken;
    return next();
  }
}
export default Token;
