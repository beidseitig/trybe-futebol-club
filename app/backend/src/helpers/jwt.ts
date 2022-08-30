import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import ErrorHandler from './errorHandler';

dotenv.config();

const secret = process.env.JWT_SECRET || 'senha';

export default class JwtService {
  static createToken(payload: { email: string, role: string }): string {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '30d',
      algorithm: 'HS256',
    };
    return jwt.sign(payload, secret, jwtConfig);
  }

  static verifyToken(token: string) {
    try {
      const check = jwt.verify(token, secret);
      console.log(check);
      return check;
    } catch (err) {
      throw new ErrorHandler(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  }
}
