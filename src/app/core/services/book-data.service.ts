import { Injectable, signal } from '@angular/core';
import { IBook } from '../interfaces/ibook';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  constructor() { 

  }
  private bookSignal = signal<IBook[]>([]);

  public booksDataReadOnly = this.bookSignal.asReadonly()


  addBook(book:IBook){
    this.bookSignal.update((oldBooks)=>[...oldBooks,book])

  }

deleteBook(index: number): void {
  this.bookSignal.update((books) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    return updatedBooks;
  });
}

}
