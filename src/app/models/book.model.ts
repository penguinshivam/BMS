export class Book {
    id: string;
    book_type: 'ebook' | 'printed';
    title: string;
    author: string;
    isbn: number;
    publication_date: string;
    genre: string;
    price: number;

    constructor(
        id:string="",
        book_type: 'ebook' | 'printed' = 'printed',
        title: string = '',
        author: string = '',
        isbn: number = 0,
        publication_date: string = '',
        genre: string = '',
        price: number = 0
    ) {
      this.id = id;
      this.book_type = book_type;
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.publication_date = publication_date;
      this.genre = genre;
      this.price = price;
    }


  }
