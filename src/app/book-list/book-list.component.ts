import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
})
export class BookListComponent implements OnChanges {
  @Input() books: any[] = [];
  @Output() editBook = new EventEmitter<any>();
  @Output() deleteBook = new EventEmitter<any>();
  http = inject(HttpClient);

  onEdit(bookId: any) {
    this.http.get(`http://127.0.0.1:3000/books/${bookId}`).subscribe((response) => {
      this.editBook.emit(response);
    })
  }

  onDelete(bookId: any) {
    this.http.delete(`http://127.0.0.1:3000/books/${bookId}`).subscribe(() => {
      this.deleteBook.emit(); // Notify parent to refresh the book list
    });
  }

  ngOnChanges() {
    console.log('Book list updated:', this.books);
  }
}
