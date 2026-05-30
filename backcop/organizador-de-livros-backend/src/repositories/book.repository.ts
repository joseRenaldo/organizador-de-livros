import { PrismaClient } from '@prisma/client';
import { Book } from '../dtos/book.dto';

export class BookRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createBook(bookData: Book): Promise<Book> {
        return await this.prisma.book.create({
            data: bookData,
        });
    }

    async findBooks(title?: string, author?: string, genre?: string): Promise<Book[]> {
        return await this.prisma.book.findMany({
            where: {
                OR: [
                    { title: { contains: title, mode: 'insensitive' } },
                    { author: { contains: author, mode: 'insensitive' } },
                    { genre: { contains: genre, mode: 'insensitive' } },
                ],
            },
        });
    }

    async getBookById(id: number): Promise<Book | null> {
        return await this.prisma.book.findUnique({
            where: { id },
        });
    }

    async updateBook(id: number, bookData: Partial<Book>): Promise<Book> {
        return await this.prisma.book.update({
            where: { id },
            data: bookData,
        });
    }

    async deleteBook(id: number): Promise<Book> {
        return await this.prisma.book.delete({
            where: { id },
        });
    }
}