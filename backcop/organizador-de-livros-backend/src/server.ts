import express from 'express';
import { json } from 'body-parser';
import { router as bookRoutes } from './routes/books.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/books', bookRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});