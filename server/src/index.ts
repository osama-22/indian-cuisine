import express, { Application, Request, Response } from 'express';
import dishRoutes from './routes/dishRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import { authenticateJWT } from './middlewares/authMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // To enable cross-origin requests
app.use(express.json());  // To parse incoming requests with JSON payloads

// API Routes
app.use('/api', dishRoutes);
app.use('/auth', authRoutes); // Auth routes

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Indian Cuisine Explorer API');
});

// Error handling for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

