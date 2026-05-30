import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { BookDTO } from '../dtos/book.dto';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public async addBook(req: Request, res: Response): Promise<void> {
        try {
            const bookData: BookDTO = req.body;
            const newBook = await this.bookService.createBook(bookData);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ message: 'Error adding book', error });
        }
    }

    public async searchBooks(req: Request, res: Response): Promise<void> {
        try {
            const { title, author, genre } = req.query;
            const books = await this.bookService.findBooks(title as string, author as string, genre as string);
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error searching books', error });
        }
    }

    public async getBookDetails(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const book = await this.bookService.findBookById(id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving book details', error });
        }
    }

    public async editBook(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const bookData: BookDTO = req.body;
            const updatedBook = await this.bookService.updateBook(id, bookData);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating book', error });
        }
    }

    public async removeBook(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await this.bookService.deleteBook(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error removing book', error });
        }
    }
}