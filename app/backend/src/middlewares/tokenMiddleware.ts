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

  const { role } = token as Jwt.JwtPayload;
  console.log(`token ${role}`);

  req.body.user = role;

  next();
};

export default tokenValidation;
