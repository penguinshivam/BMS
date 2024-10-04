let books = [];

// BaseBook class definition  1(SRP/Lisksov LSP)
class BaseBook {
    constructor(title, author, isbn, pubDate, genre , price) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.pubDate = pubDate;
        this.genre = genre;
        this.age = this.calculateBookAge();
        this.originalPrice = price; // Original price based on genre and age
        this.discountPrice = this.calculateDiscountPrice(); // Discounted price based on conditions
    }

    // Calculate the age of the book in years
    calculateBookAge() {
        const pubDate = new Date(this.pubDate);
        const today = new Date();
        let age = today.getFullYear() - pubDate.getFullYear();
        const m = today.getMonth() - pubDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < pubDate.getDate())) {
            age--;
        }
        return age;
    }

    calculateDiscountPrice() {
        let discountRate = 0.1; // Default 10% discount rate
        // Apply discount based on the age of the book
        if (this.age > 3) {
            discountRate = 0.3;  // 30% discount for books older than 3 years
        } else if (this.age > 1) {
            discountRate = 0.2;  // 20% discount for books between 1 and 3 years
        }
        return parseFloat((this.originalPrice * (1 - discountRate)).toFixed(2));
    }    

    // 5.DIP 
    getBookDetails() {
        return `
            <strong>Title:</strong> ${this.title}<br>
            <strong>Author:</strong> ${this.author}<br>
            <strong>ISBN:</strong> ${this.isbn}<br>
            <strong>Publication Date:</strong> ${this.pubDate}<br>
            <strong>Age:</strong> ${this.age} years<br>
            <strong>Genre:</strong> ${this.genre}<br>
            <strong>Original Price:</strong> RS.${this.originalPrice}<br>
            <strong>Discounted Price:</strong> RS.${this.discountPrice}
        `;
    }
    getBookSummary() {
        return `
            <strong>Title:</strong> ${this.title}<br>
            <strong>Author:</strong> ${this.author}<br>
            <strong>Original Price:</strong> RS.${this.originalPrice}<br>
            <strong>Discounted Price:</strong> RS.${this.discountPrice}
        `;
    }
}

// 3.LSP /2.OCP
// EBook subclass
class EBook extends BaseBook {
    constructor(title, author, isbn, pubDate, genre, price, fileSize, format) {
        super(title, author, isbn, pubDate, genre ,price);
        this.fileSize = fileSize;
        this.format = format;
    }

    // Override to include EBook-specific fields
    getBookDetails() {
        return `
            ${super.getBookDetails()}<br>
            <strong>File Size:</strong> ${this.fileSize}MB<br>
            <strong>Format:</strong> ${this.format}
        `;
    }
    getBookSummary() {
        return `
            ${super.getBookSummary()}<br>
            <strong>Book Type:</strong> E-Book
        `;
    }
}

// PrintedBook subclass
class PrintedBook extends BaseBook {
    constructor(title, author, isbn, pubDate, genre, price,pageCount, bindingType) {
        super(title, author, isbn, pubDate, genre, price);
        this.pageCount = pageCount;
        this.bindingType = bindingType;
    }
    // Override to include PrintedBook-specific fields
    getBookDetails() {
        return `
            ${super.getBookDetails()}<br>
            <strong>Page Count:</strong> ${this.pageCount}<br>
            <strong>Binding Type:</strong> ${this.bindingType}
        `;
    }
    getBookSummary() {
        return `
            ${super.getBookSummary()}<br>
            <strong>Book Type:</strong> Printed Book
        `;
    }
}

// Fetch books from an external API  (1SRP)
async function fetchBooksFromAPI() {
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
// Fetch books from API on page load
fetchBooksFromAPI();

// Simulate a server-request
function simulateServerRequest(book) {
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

// Add book function
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

// Validation function
function validateForm() {
    let errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const pubDate = document.getElementById('pub-date').value;
    const genre = document.getElementById('genre').value;
    const price = document.getElementById('price').value.trim();

    let isValid = true;

    if (!title) {
        document.getElementById('titleError').textContent = 'Title is required.';
        isValid = false;
    }
    if (!author) {
        document.getElementById('authorError').textContent = 'Author is required.';
        isValid = false;
    }
    if (!isbn) {
        document.getElementById('isbnError').textContent = 'ISBN is required.';
        isValid = false;
    }  else if (isNaN(isbn)) {
        document.getElementById('isbnError').textContent = 'ISBN must be a number.';
        isValid = false;
    }
    if (!pubDate) {
        document.getElementById('pubDateError').textContent = 'Publication Date is required.';
        isValid = false;
    } else {
        const pubDateObj = new Date(pubDate);
        const today = new Date();
        if (pubDateObj > today) {
            document.getElementById('pubDateError').textContent = 'Publication Date cannot be in the future.';
            isValid = false;
        }
    }
    if (!genre) {
        document.getElementById('genreError').textContent = 'Genre is required.';
        isValid = false;
    }
    if (!price) {
        document.getElementById('priceError').textContent = 'Price is required.';
        isValid = false;
    }  else if (isNaN(price)) {
        document.getElementById('priceError').textContent = 'Price must be a number.';
        isValid = false;
    }

    // Validate specific fields based on book type
    const bookType = document.getElementById('bookType').value;
    if (bookType === 'ebook') {
        const fileSize = document.getElementById('fileSize').value;
        const format = document.getElementById('format').value;

        if (!fileSize || fileSize <= 0) {
            document.getElementById('fileSizeError').textContent = 'Valid file size is required.';
            isValid = false;
        }

        if (!format) {
            document.getElementById('formatError').textContent = 'Format is required.';
            isValid = false;
        }
    } else {
        const pageCount = document.getElementById('pageCount').value;
        const bindingType = document.getElementById('bindingType').value;

        if (!pageCount || pageCount <= 0) {
            document.getElementById('pageCountError').textContent = 'Valid page count is required.';
            isValid = false;
        }

        if (!bindingType) {
            document.getElementById('bindingTypeError').textContent = 'Binding type is required.';
            isValid = false;
        }
    }
    return isValid;
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

// Handle search functionality
function handleBookSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const results = books.filter(book => book.title.toLowerCase().includes(query));
    renderBookList(results);
}

// Render search results
function renderBookList(bookName) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (bookName.length === 0) {
        bookList.innerHTML = '<p class="text-center text-gray-700">No books found.</p>';
        return;
    }
    bookName.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item', 'flex', 'justify-between', 'p-4', 'bg-white', 'rounded-lg', 'shadow', 'mb-4');
        bookItem.innerHTML = `
            <div class="flex flex-col items-start">
                <div>${book.getBookSummary()}</div>
                <div class="mt-4">
                    <button class="edit bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onclick="editBook(${index})">Edit</button>
                    <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2" onclick="deleteBook(${index})">Delete</button>
                    <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-2" onclick="showBook(${index})">Show</button>
                </div>
            </div>`;
        bookList.appendChild(bookItem);
    });
}

// Edit book
function editBook(index) {
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
function deleteBook(index) {
    if (confirm(`Are you sure you want to delete "${books[index].title}"?`)) {
        books.splice(index, 1);
        renderBookList(books);
    }
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

// show book
function showBook(index){
    const book = books[index] ;
    const main_container = document.querySelector("#main_container");
    main_container.classList.add("hidden");
    const showPage = document.querySelector("#showPage");
    showPage.classList.remove("hidden");    
    showPage.innerHTML ='';
    const bookItem = document.createElement('div');
        bookItem.classList.add('book-item', 'flex', 'justify-between', 'p-4', 'bg-white', 'rounded-lg', 'shadow', 'mb-4');
        bookItem.innerHTML = `
            <div class="flex flex-col items-start">
                <div>${book.getBookDetails()}</div>
                <div class="mt-4">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-2" onclick="backBtn()">Back</button>
                </div>
            </div>`;
        showPage.appendChild(bookItem);
}

function backBtn(){
    const main_container = document.querySelector("#main_container");
    main_container.classList.remove("hidden");
    const showPage = document.querySelector("#showPage");
    showPage.classList.add("hidden");    
    showPage.innerHTML ='';
}