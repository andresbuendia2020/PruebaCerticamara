import { Injectable } from '@angular/core';
import { Book } from '../app/book.model'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private books: Book[] = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', publishedDate: '2008-08-01' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', publishedDate: '1999-10-20' },
    { id: 3, title: "You Don't Know JS", author: 'Kyle Simpson', publishedDate: '2014-12-28' }
  ];

  constructor() { }

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  addBook(book: Book): Observable<Book> {
    book.id = this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
    this.books.push(book);
    return of(book);
  }

  updateBook(updatedBook: Book): Observable<Book> {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
    }
    return of(updatedBook);
  }

  deleteBook(id: number): Observable<void> {
    this.books = this.books.filter(book => book.id !== id);
    return of();
  }
}
