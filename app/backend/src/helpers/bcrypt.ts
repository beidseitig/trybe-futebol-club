import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import ErrorHandler from './errorHandler';

export default class Bcrypt {
  static encryptedPassword(password: string): string {
    const hash = bcrypt.hashSync(password, 6);
    return hash;
  }

  static passwordCheck(password: string, hash: string) {
    const check = bcrypt.compareSync(password, hash);

    if (!check) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }
  }
}
