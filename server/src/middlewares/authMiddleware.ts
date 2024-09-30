import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: string;
}

// Middleware to verify JWT
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting Bearer Token

  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
  }
  else {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = (decoded as any).userId; // Extract userId from token
        next();
      } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      }
  }

};
