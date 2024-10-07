import { EBook } from './EBook.js';
import { PrintedBook } from './PrintedBook.js';
// Edit book
export function editBook(index,books,renderBookList) {
    console.log(index);
    
    const book = books[index];
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('isbn').value = book.isbn;
    document.getElementById('pub-date').value = book.pubDate;
    document.getElementById('genre').value = book.genre;
    document.getElementById('price').value = book.originalPrice;

    // Show/hide specific fields based on book type
    if (book instanceof EBook) {
        document.getElementById('bookType').value = 'ebook';
        document.getElementById('ebookFields').classList.remove('hidden');
        document.getElementById('printedBookFields').classList.add('hidden');
        document.getElementById('fileSize').value = book.fileSize;
        document.getElementById('format').value = book.format;
    } else if (book instanceof PrintedBook) {
        document.getElementById('bookType').value = 'printed';
        document.getElementById('ebookFields').classList.add('hidden');
        document.getElementById('printedBookFields').classList.remove('hidden');
        document.getElementById('pageCount').value = book.pageCount;
        document.getElementById('bindingType').value = book.bindingType;
    }

    // Remove the book from the list to allow editing
    books.splice(index, 1);
    renderBookList(books);
}

// Delete book
export function deleteBook(index,books,renderBookList) {
    console.log(index);

    if (confirm(`Are you sure you want to delete "${books[index].title}"?`)) {
        books.splice(index, 1);
        renderBookList(books);
    }
}