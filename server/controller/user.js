import HashPassword from '../helpers/hashPassword';
import userModel from '../model/user';
import Response from '../helpers/resp';
import Token from '../helpers/token';

class UserController {
  static async signup(req, res) {
    const {
      email, password, firstname, lastname
    } = req.body;
    const encryptedPassword = await HashPassword.create(password);
    const userObject = {
      email,
      firstname,
      password: encryptedPassword,
      lastname,
    };
    const data = await userModel.findUser(email);
    console.log(data);
    if (data) return Response.error(res, 400, 'Email exists already! try another!');
    const payload = await userModel.create(userObject);
    if (payload) {
      const payloadObject = {
        userId: payload.userid,
        email: payload.email,
      };
      const token = await Token.createToken(payloadObject);
      payloadObject.firstname = payload.firstname;
      payloadObject.lastname = payload.lastname;

      return Response.success(res, 201, {
        user: payloadObject,
        token,
      });
    }
    return Response.error(res, 500, 'Internal server error!');
 
  }
}

export default UserController;
