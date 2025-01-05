import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-book-list',
    imports: [CommonModule],
    templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnChanges {
  @Input() books: any[] = [];
  @Output() editBook = new EventEmitter<any>();
  @Output() deleteBook = new EventEmitter<any>();
  http = inject(HttpClient);

  onEdit(bookId: any) {
    let url=process.env['PROD_BMS_URL'] ?? "http://localhost:3000/";
    this.http.get(url.concat(`books/${bookId}`)).subscribe((response) => {
      this.editBook.emit(response);
    })
  }

  onDelete(bookId: any) {
    let url=process.env['PROD_BMS_URL'] ?? "http://localhost:3000/";
    this.http.delete(url.concat(`books/${bookId}`)).subscribe(() => {
      this.deleteBook.emit(); // Notify parent to refresh the book list
    });
  }

  ngOnChanges() {
    console.log('Book list updated:', this.books);
  }
}
