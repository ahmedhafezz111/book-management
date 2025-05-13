import { Routes } from '@angular/router';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [

{path:'', component:BookFormComponent , pathMatch:"full"},
{path:'addbook', component:BookFormComponent},
{path:'booklist', component:BookListComponent },

];
