import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as Jwt from 'jsonwebtoken';
import jwt from '../helpers/jwt';

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token must be a valid token' });
  }

  const token = jwt.verifyToken(authorization);
  console.log(token);

  const { role } = token as Jwt.JwtPayload;

  req.body.user = role;

  next();
};

export default tokenValidation;
