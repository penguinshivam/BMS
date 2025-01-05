import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import {v4 as uuidv4} from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    private apiUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=MzvcsgtiSXjz4vEIHAGlF1MC1LhFyPZF';

    constructor() {}

    async fetchBooks(): Promise<Book[]> {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }

            const data = await response.json();
            const booksFromAPI = data.results;

            return booksFromAPI.slice(15, 20).map((apiBook:Book) => {
                const isEBook = Math.random() > 0.5;
                return isEBook
                    ? new Book(uuidv4(),"ebook",apiBook.title, apiBook.author, Math.floor(Math.random() * 100000000), new Date().toISOString().split('T')[0], 'fiction', Math.floor(Math.random() * 1000))
                    : new Book(uuidv4(),"printed",apiBook.title, apiBook.author, Math.floor(Math.random() * 100000000), new Date().toISOString().split('T')[0], 'non-fiction', Math.floor(Math.random() * 1000));
            });
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    }
}
