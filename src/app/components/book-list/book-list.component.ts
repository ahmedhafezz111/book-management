import { Component, inject, OnInit } from '@angular/core';
import { IBook } from '../../core/interfaces/ibook';
import { BookDataService } from '../../core/services/book-data.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule,SearchPipe],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{
  text:string=""

  bookData:IBook[]=[]
  bookDataService = inject(BookDataService)
  sortedBooks: IBook[] = []; 
  currentPageBooks:IBook[] = []
  currentPage :any = 1
  booksPerPage:any = 5

 ngOnInit(): void {
   this.sortedBooks = [...this.bookDataService.booksDataReadOnly()];
    this.setPageBooks(1);
  }

  setPageBooks(page:number):void{
    const start = (page-1)*this.booksPerPage
    const end = start+this.booksPerPage
    this.currentPageBooks = this.sortedBooks.slice(start,end)
    this.currentPage = page
  }

  getPageCount():number{
    return Math.ceil(this.bookDataService.booksDataReadOnly().length/this.booksPerPage)
  }
  nextPage():void{
        if (this.currentPage < this.getPageCount()) {
      this.setPageBooks(this.currentPage + 1);
    }
  }
    prevPage(): void {
    if (this.currentPage > 1) {
      this.setPageBooks(this.currentPage - 1);
    }
  }

 

deleteBook(i: number): void {
  const actualIndex = (this.currentPage - 1) * this.booksPerPage + i;
  this.bookDataService.deleteBook(actualIndex);

  
  this.sortedBooks = [...this.bookDataService.booksDataReadOnly()];

  
  if (this.currentPage > 1 && this.sortedBooks.length <= (this.currentPage - 1) * this.booksPerPage) {
    this.setPageBooks(this.currentPage - 1);
  } else {
    this.setPageBooks(this.currentPage);
  }
}
  

 sortData(by: 'title' | 'authorName' | 'publishDate'): void {


    this.sortedBooks = [...this.bookDataService.booksDataReadOnly()];

  if (by === 'title') {
    this.sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (by === 'authorName') {
    this.sortedBooks.sort((a, b) => a.authorName.localeCompare(b.authorName));
  } else if (by === 'publishDate') {
    this.sortedBooks.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
  }
   this.setPageBooks(1);
}

}
