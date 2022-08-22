import * as joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ErrorHandler from '../helpers/errorHandler';
import jwt from '../helpers/jwt';
import User from '../database/models/user';

const schema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default class LoginService {
  static async login(email: string, password: string): Promise<string> {
    const { error } = schema.validate({ email, password });

    if (error) {
      throw new ErrorHandler(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    }

    const userLogin = await User.findOne({ where: { email } });

    if (!userLogin) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = jwt.createToken({ email });

    return token;
  }
}
