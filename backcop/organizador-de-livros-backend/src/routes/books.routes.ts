import { Router } from 'express';
import BookController from '../controllers/book.controller';

const router = Router();
const bookController = new BookController();

// Route to add a new book
router.post('/books', bookController.addBook);

// Route to search for books
router.get('/books', bookController.searchBooks);

// Route to get details of a specific book
router.get('/books/:id', bookController.getBookDetails);

// Route to edit an existing book
router.put('/books/:id', bookController.editBook);

// Route to remove a book
router.delete('/books/:id', bookController.removeBook);

export default router;