import express from 'express';
import { json } from 'body-parser';
import booksRoutes from './routes/books.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

// Middleware
app.use(json());

// Routes
app.use('/api/books', booksRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;