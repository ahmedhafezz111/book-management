export interface IBook {
title: string;        
  authorName: string;       
  genre: 'fiction' | 'non-fiction' | 'science' | 'history' | 'biography'; 
  publishDate: Date;  
}
