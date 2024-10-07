// PrintedBook subclass
// module/printedbook.js
import{BaseBook} from './BaseBook.js';

export class PrintedBook extends BaseBook {
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
