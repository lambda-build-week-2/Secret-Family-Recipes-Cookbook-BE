import HashPassword from '../helpers/hashPassword';
import userModel from '../model/user';
import Response from '../helpers/resp';
import Token from '../helpers/token';

class UserController {
  static async signup(req, res) {
    try {
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
    } catch (err) {
      return Response.error(res, 500, 'Internal server error!');
    }
  }

  static async signin(req, res) {
    const { email, password } = req.body;
    const data = await userModel.findUser(email);
    if (!data) return Response.error(res, 400, 'invalid username or password');
    const realPassword = await HashPassword.verify(password, data.password);
    if (!realPassword) return Response.error(res, 400, 'invalid username or password');
    const payload = {
      userId: data.userid,
      email: data.email
    };
    const token = await Token.createToken(payload);
    payload.firstname = data.firstname;
    payload.lastname = data.lastname;

    return Response.success(res, 200, {
      user: payload,
      token
    });
  }
}

export default UserController;
