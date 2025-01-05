import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnChanges {
  @Input() bookToEdit: Book | null = null;
  @Output() addOrUpdateBook = new EventEmitter<void>();
  newBook: Book = new Book();
  formSubmitted = false;
  http = inject(HttpClient);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bookToEdit'] && this.bookToEdit) {
      this.newBook = { ...this.bookToEdit };
    } else {
      this.resetForm();
    }
  }

  onSubmit(bookForm: any) {
    this.formSubmitted = true;

    if (bookForm.valid) {

      if (this.bookToEdit) {
        const bookInstance = new Book(
          this.bookToEdit.id,
          this.newBook.book_type,
          this.newBook.title,
          this.newBook.author,
          this.newBook.isbn,
          this.newBook.publication_date,
          this.newBook.genre,
          this.newBook.price
        );
        this.http
          .put(
            `http://127.0.0.1:3000/books/${this.bookToEdit?.id}`,
            bookInstance
          )
          .subscribe(() => {
            this.addOrUpdateBook.emit();
            this.resetForm();
          });
      } else {
        const bookInstance = new Book(
          uuidv4(),
          this.newBook.book_type,
          this.newBook.title,
          this.newBook.author,
          this.newBook.isbn,
          this.newBook.publication_date,
          this.newBook.genre,
          this.newBook.price
        );
        console.log(bookInstance);
        this.http
          .post('http://127.0.0.1:3000/books', bookInstance)
          .subscribe(() => {
            this.addOrUpdateBook.emit();
            this.resetForm();
          });
      }
    }
  }

  resetForm() {
    this.newBook = new Book();
    this.bookToEdit = null;
    this.formSubmitted = false;
  }
}
