import * as joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ILogin from '../interfaces/ILogin';
import Bcrypt from '../helpers/bcrypt';
import ErrorHandler from '../helpers/errorHandler';
import jwt from '../helpers/jwt';
import User from '../database/models/user';

export default class LoginService implements ILogin {
  email: string;
  password: string;

  static loginValidation(payload: ILogin) {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(payload);

    if (error) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }
  }

  static async login(payload: ILogin): Promise<string> {
    LoginService.loginValidation(payload);
    const userLogin = await User.findOne({ where: { email: payload.email } });

    if (!userLogin) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    Bcrypt.passwordCheck(payload.password, userLogin.password);

    const token = jwt.createToken({ email: payload.email, role: userLogin.role });

    return token;
  }
}
