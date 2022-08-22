import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'senha';

export default class JwtService {
  static createToken(payload: { email: string }): string {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '30d',
      algorithm: 'HS256',
    };
    return jwt.sign(payload, secret, jwtConfig);
  }
}
