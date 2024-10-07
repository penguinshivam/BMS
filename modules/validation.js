// Validation function
export function validateForm() {
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
