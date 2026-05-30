// src/types/index.d.ts

export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    synopsis: string;
}

export interface CreateBookDto {
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    synopsis: string;
}

export interface UpdateBookDto {
    title?: string;
    author?: string;
    genre?: string;
    publicationYear?: number;
    synopsis?: string;
}