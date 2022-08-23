import * as joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import Bcrypt from '../helpers/bcrypt';
import ErrorHandler from '../helpers/errorHandler';
import jwt from '../helpers/jwt';
import User from '../database/models/user';

export default class LoginService {
  static async login(email: string, password: string): Promise<string> {
    const userLogin = await User.findOne({ where: { email } });
    console.log(userLogin);

    if (!userLogin) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    Bcrypt.passwordCheck(password, userLogin.password);

    const token = jwt.createToken({ email });

    return token;
  }

  static loginValidation(email: string, password: string): void {
    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate({ email, password });

    if (error) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }
  }
}
