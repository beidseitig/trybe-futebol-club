import * as jwt from 'jsonwebtoken';

export class JwtService {
  static sign(payload: { id: number, email: string }): string {
    return jwt.sign(payload, 'SUPER SENHA');
  }
}

export default JwtService;
