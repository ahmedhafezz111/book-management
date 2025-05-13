import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { IBook } from '../../core/interfaces/ibook';
import { BookDataService } from '../../core/services/book-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {
  bookData:IBook[] =[]
  newBook:any
  isLoading:boolean = false
  bookDataService = inject(BookDataService)
  toastrService = inject(ToastrService)

  bookForm:FormGroup = new FormGroup({
    title: new FormControl(null , [Validators.required , Validators.maxLength(100)]),
    authorName:new FormControl(null , [Validators.required , Validators.maxLength(50)]),
    genre:new FormControl(null,[Validators.required]),
    publishDate:new FormControl(null , [Validators.required])

  })

 
  submitForm():void{
    if(this.bookForm.valid){

     const newBook: IBook = {
        title: this.bookForm.value.title,
        authorName: this.bookForm.value.authorName,
        genre: this.bookForm.value.genre,
        publishDate: this.bookForm.value.publishDate
      };
      
      this.bookDataService.addBook(newBook);
          this.bookForm.reset()
          this.toastrService.success("Shelfy","Book added successfully")
          this.isLoading=true
          setTimeout(
            ()=>this.isLoading=false , 1000
          )
         
    }
  }

}
