export interface BookDTO {
    id?: string; // Optional for new books
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    synopsis: string;
}