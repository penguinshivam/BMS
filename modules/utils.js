import { EBook } from './EBook.js';
import { PrintedBook } from './PrintedBook.js';
// Fetch books from an external API  (1SRP)
export async function fetchBooksFromAPI(books, renderBookList) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');  
        if (!response.ok) {
            throw new Error('Failed to fetch books from the server');
        }

        const booksFromAPI = await response.json();
        // Process fetched books and create either EBook or PrintedBook
        booksFromAPI.slice(0, 5).forEach(apiBook => {
            // Randomly create either an EBook or PrintedBook
            const isEBook = Math.random() > 0.5;
            const newBook = isEBook
                ? new EBook(apiBook.title, 'Unknown Author', Math.floor(Math.random() * 1000000), new Date().toISOString().split('T')[0], 'fiction', Math.floor(Math.random() * 1000), 5, 'PDF')
                : new PrintedBook(apiBook.title, 'Unknown Author', Math.floor(Math.random() * 1000000), new Date().toISOString().split('T')[0], 'non-fiction', Math.floor(Math.random() * 1000), 300, 'Paperback');
            books.push(newBook);
        });
        // renderBookList();
        renderBookList(books);
    } catch (error) {
        alert(error.message);
    }
}

// Simulate a server-request
export function simulateServerRequest(book) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (book) {
                resolve(`Book titled "${book.title}" added successfully!`);
            } else {
                reject("Failed to add the book.");
            }
        }, 1000);
    });
}

