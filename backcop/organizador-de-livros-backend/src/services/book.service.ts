import { BookRepository } from '../repositories/book.repository';
import { BookDTO } from '../dtos/book.dto';

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    async createBook(bookData: BookDTO) {
        return await this.bookRepository.create(bookData);
    }

    async findBooks(query: string) {
        return await this.bookRepository.find(query);
    }

    async updateBook(id: string, bookData: BookDTO) {
        return await this.bookRepository.update(id, bookData);
    }

    async deleteBook(id: string) {
        return await this.bookRepository.delete(id);
    }

    async getBookById(id: string) {
        return await this.bookRepository.findById(id);
    }
}