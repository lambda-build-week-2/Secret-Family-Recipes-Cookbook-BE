import validator from 'validator';
import Response from '../helpers/resp';

class Validator {
  static validateSignUp(req, res, next) {
    const {
      email, password, firstname, lastname
    } = req.body;
    if (typeof email === 'undefined' || !validator.isEmail(email.trim())) {
      return Response.error(res, 400, 'Enter a valid email address');
    }
    if (typeof password !== 'string' || password.trim().length < 6) {
      return Response.error(res, 400, 'Enter a valid password! password must be greater than 6 characters.');
    }
    if (typeof firstname !== 'string' || firstname.trim().length < 2) {
      return Response.error(res, 400, 'Enter a valid Firstname! Firstname must be 2 or more characters.');
    }
    if (typeof lastname !== 'string' || lastname.trim().length < 2) {
      return Response.error(res, 400, 'Enter a valid Lastname! Lastname must be 2 or more characters.');
    }
    return next();
  }

  static validateSignin(req, res, next) {
    const { email, password } = req.body;
    if (typeof email === 'undefined' || !validator.isEmail(email.trim())) {
      return Response.error(res, 400, 'Enter a valid email address');
    }
    if (typeof password !== 'string' || password.trim().length < 6) {
      return Response.error(res, 400, 'Enter a valid password! password must be greater than 6 characters.');
    }

    return next();
  }
}

export default Validator;
