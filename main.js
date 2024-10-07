import { EBook } from './modules/EBook.js';
import { PrintedBook } from './modules/PrintedBook.js';
import { showBook  } from './modules/show.js';
import { fetchBooksFromAPI, simulateServerRequest } from './modules/utils.js';
import { editBook, deleteBook } from './modules/bookControls.js';
import { validateForm } from './modules/validation.js';

let books = [];

// fetch books from API on page load
fetchBooksFromAPI(books, renderBookList);

// Add book function
let btn = document.querySelector("#submit-btn");
btn.addEventListener("click", addBook);

async function addBook() {
    let isValid = validateForm(); // Validate form inputs
    if (!isValid) return;

    const form = getBookFromForm();
    let newBook;

    // Get book-type from the form
    const bookType = document.getElementById('bookType').value;

    if (bookType === 'ebook') {
        const fileSize = document.getElementById('fileSize').value;
        const format = document.getElementById('format').value;

        newBook = new EBook(form.title, form.author, form.isbn, form.pubDate, form.genre,form.price, fileSize, format);
    } else {
        const pageCount = document.getElementById('pageCount').value;
        const bindingType = document.getElementById('bindingType').value;

        newBook = new PrintedBook(form.title, form.author, form.isbn, form.pubDate, form.genre, form.price, pageCount, bindingType);
    }

    try {
        const result = await simulateServerRequest(newBook);
        books.push(newBook);
        renderBookList(books);
        clearForm();
        alert(result); // Success message
    } catch (error) {
        alert(error); // Error message
    }
}

// Get book data from form  5.DIP
function getBookFromForm() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const pubDate = document.getElementById('pub-date').value;
    const genre = document.getElementById('genre').value;
    const price = document.getElementById('price').value;
    return { title, author, isbn, pubDate, genre ,price};
}


// Clear form
function clearForm() {
    document.getElementById('bookForm').reset();
    // Hide EBook-specific fields by default
    document.getElementById('ebookFields').classList.add('hidden');
    document.getElementById('printedBookFields').classList.remove('hidden');
    // Clear all error messages
    let errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
}
function renderBookList(bookName) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (bookName.length === 0) {
        bookList.innerHTML = '<p class="text-center text-gray-700">No books found.</p>';
        return;
    }const genres = groupBooksByGenre(bookName);
    for (const genre in genres) {
        const genreHeading = document.createElement('div');
        genreHeading.classList.add('genre-heading', 'text-lg', 'font-bold', 'text-gray-700', 'mt-8');
        genreHeading.textContent = genre;
        bookList.appendChild(genreHeading);

        genres[genre].forEach((book) => {
        const index=books.indexOf(book)
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item', 'flex', 'justify-between', 'p-4', 'bg-white', 'rounded-lg', 'shadow', 'mb-4');
        bookItem.innerHTML = `
            <div class="flex flex-col items-start">
                <div>${book.getBookSummary()}</div>
                <div class="mt-4">
                    <button id = "edit-btn" class="edit bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"onclick="editBook(${book})">Edit</button>
                    <button id = "delete-btn" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2" onclick="deleteBook(${index})">Delete</button>
                    <button id = "show-btn" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-2" onclick="showBook(${index})">Show</button>
                </div>
            </div>`;
        bookList.appendChild(bookItem);
    })}}

function groupBooksByGenre(results) {
    // Group books by genre (unchanged)
    const grouped = {};
    results.forEach(book => {
        if (!grouped[book.genre]) {
            grouped[book.genre] = [];
        }
        grouped[book.genre].push(book);
    });
    return grouped;
}
// Handle search functionality
function handleBookSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = books.filter(book => book.title.toLowerCase().includes(query));
    renderBookList(results);
}

// Show/Hide specific fields based on book type
document.getElementById('bookType').addEventListener('change', function () {
    const bookType = this.value;
    if (bookType === 'ebook') {
        document.getElementById('ebookFields').classList.remove('hidden');
        document.getElementById('printedBookFields').classList.add('hidden');
    } else {
        document.getElementById('ebookFields').classList.add('hidden');
        document.getElementById('printedBookFields').classList.remove('hidden');
    }    
});
window.editBook = (index) => editBook(index, books,renderBookList);
window.deleteBook = (index) => deleteBook(index, books,renderBookList);
window.showBook = (index) => showBook(index, books);
window.handleBookSearch = () => handleBookSearch();
window.backBtn = () => {
    const main_container = document.querySelector("#main_container");
    main_container.classList.remove("hidden");
    const showPage = document.querySelector("#showPage");
    showPage.classList.add("hidden");    
    showPage.innerHTML ='';
};

console.log(books);

