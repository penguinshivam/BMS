// BaseBook class definition  1(SRP/Lisksov LSP)
export class BaseBook {
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