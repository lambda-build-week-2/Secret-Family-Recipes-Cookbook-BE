import Response from "../helpers/Response";
import models from "../models";
import Token from "../helpers/Token";
import extractUser from "../helpers/extractUser";

class UserController {
  static async signup(req, res) {
    const { User } = models;
    try {
      const { email, password, firstname, lastname } = req.body;
      const signup = {
        email,
        password,
        firstname,
        lastname
      };
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: signup
      });
      if (!created) return Response.error(res, 409, "Email already taken");
      const token = await Token.create({
        userId: user.id,
        email: user.email,
        firstname: user.firstname
      });

      const payload = extractUser(user, token);

      return Response.success(res, 201, payload, "User successfully created!");
    } catch (err) {
      return Response.error(res, 500, err);
    }
  }
}
export default UserController;
