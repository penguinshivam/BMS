import {Component, inject, OnInit} from '@angular/core';
import {BookFormComponent} from './book-form/book-form.component';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './book-list/book-list.component';
import {BookService} from './services/book.service';
import {Book} from './models/book.model';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    providers: [BookService],
    imports: [CommonModule, BookListComponent, BookFormComponent],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  bookToEdit: Book | null = null;
  http = inject(HttpClient);
  apiBooks: Book[] = [];


  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    let url=process.env['PROD_BMS_URL'] ?? "http://localhost:3000/";
    this.http.get(url.concat("books/count")).subscribe(async (
      response: any) => {
      if (response.count < 5) {
        await this.loadBooks();
      } else {
        this.handleRefresh();
      }
    });
  }

  async loadBooks() {
    try {
      let url=process.env['PROD_BMS_URL'] ?? "http://localhost:3000/";
      this.apiBooks = await this.bookService.fetchBooks();
      for (const book of this.apiBooks) {
        this.http.post(url.concat("books"), book).subscribe((response: any) => {
          this.handleRefresh();
        });
      }
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }

  handleRefresh() {
    let url=process.env['PROD_BMS_URL'] ?? "http://localhost:3000/";
    this.http.get(url.concat("books")).subscribe((result: any) => {
      this.books = result;
    });
  }

  editBook(book: any) {
    this.bookToEdit = book; // Pass the book to the form component for editing
  }
}

