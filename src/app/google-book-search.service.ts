import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class GooglebookSearchService {
  searchResult; //to store search results.

  constructor(private backend: BackendService) { }

  mannualBookNameSearch(search: string) {
    this.searchResult = [];
    let obj = {};
    let isbn;
    let image = "";
    let array = [];
    let data;
    var authorsTemp;

    if (search.trim().length == 0) {
      return "search is empty";       //search string is empty
    }

    else {
      this.backend.mannualBookSearch_loginPanel(search).subscribe(json => {
        if (json === "BOOK_NA") {
          this.searchResult = [];
          return "no result found";   // no result found
        }
        else {
          for (var i = 0; i < 9; i++) {
            data = json[0].items[i].volumeInfo;
            (data.imageLinks == undefined) ? image = "#" : image = data.imageLinks.thumbnail;
            (data.industryIdentifiers == undefined) ? isbn = ['NA', ''] : isbn = data.industryIdentifiers;
            (data.authors) ? authorsTemp = data.authors : authorsTemp = ['NA', ''];
            obj = {
              image: image,
              title: data.title,
              author: authorsTemp,
              isbn: isbn
            }
            array.push(obj);
          }
          for (var l in array) {
            this.searchResult.push(array[l]);
          }

        }
      }); //subscribe 

    } //else ends
    return this.searchResult;
  }
}
