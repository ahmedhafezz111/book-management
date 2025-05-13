import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfObjects:any[], term:string): any[] {

    return arrayOfObjects.filter((book)=>book.title.toLowerCase().includes(term.toLowerCase()) || book.authorName.toLowerCase().includes(term.toLowerCase())) ;
  }

}
