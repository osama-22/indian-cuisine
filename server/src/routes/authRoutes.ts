import express, { Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';
import { check } from 'express-validator';

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be 6 characters or more').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await register(req, res);
    } catch (error) {
      next(error);
    }
  }
);

// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await login(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
