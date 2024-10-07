// 3.LSP /2.OCP
import {BaseBook} from './BaseBook.js';
// EBook subclass
export class EBook extends BaseBook {
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
