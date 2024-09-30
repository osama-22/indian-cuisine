import express from 'express';
import { getAllDishes, getAllIngredients, getDishByName, getDishesByIngredients, getProtected } from '../controllers/dishController';
import { authenticateJWT } from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/dishes', getAllDishes);
router.get('/dishes/:name', getDishByName);
router.get('/suggestions', getDishesByIngredients);
router.get('/ingredients', getAllIngredients);
router.get('/protected', authenticateJWT, getProtected);

export default router;