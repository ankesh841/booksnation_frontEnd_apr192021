//the easiest mehtod...

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { GooglebookSearchService } from '../google-book-search.service';
import * as $ from 'jquery';
import { PostBookService } from '../post-book.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Route } from '@angular/compiler/src/core';
@Component( {
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
} )
export class PostPageComponent implements OnInit {
  hidePage: boolean;


  showScrollbar;
  searchBookError;
  bookSearch; // array to store search results.
  showStep_3: boolean;

  price;  //selected book price

  selectedBook; //array to store selected book
  constructor( private route: ActivatedRoute, private afAuth: AngularFireAuth, private backend: BackendService, private googleSearch: GooglebookSearchService, private router: Router, private postBookService: PostBookService ) {

    this.afAuth.authState.subscribe( ( res ) => {
      if ( res ) {
        this.hidePage = true;
      }
      else {

        this.router.navigate( ["/"] ).then( result => { window.location.href = 'login'; } );


      }
    } )
  }

  ngOnInit() {


  }

  searchBar: boolean

  //   resolveAfter2Seconds(string) {
  //     return new Promise(resolve => {
  //       setTimeout(() => {
  //         resolve(string);
  //       }, 2000);

  //     });
  //   }
  // aneksh(stinrg){
  //   return new Promise(temp =>{

  //   });
  // }


  // getValueWithPromise() {
  //   this.resolveAfter2Seconds(20).then(value => {
  //     console.log(`promise result: ${value}`);
  //   });
  //   console.log('I will not wait until promise is resolved');
  // }
  // 

  mannualBookNameSearch( search: string ) {
    search = this.backend.inputFilter( search );

    if ( search.length > 3 ) {
      this.backend.hidingKeyboard();
      try {

        var result = this.googleSearch.mannualBookNameSearch( search ); //getting search result from the service
        console.log( result )
        this.searchBookError = "";
        this.searchBar = true;  //showing the progress bar
        this.bookSearch = result; //assigning it to the var.
        this.showScrollbar = true;  //showing div

        setTimeout( () => {
          if ( result.length === 9 ) {
            this.searchBar = false;

            var elmnt = document.getElementById( "resultDiv" );
            elmnt.scrollIntoView(); //showing the result div focus

          }
          else {
            // if (result.length <= 0) {

            this.searchBookError = "No Result Found, Check your key word"
            this.searchBar = false;
            this.showScrollbar = false;
            // }
            // this.searchBar = false;
            // this.showScrollbar = false
          }

        }, 2000 ); //using timeout fuctino..



      } catch ( error ) {
      }
    }
  }

  selectedBook_( obj ) {
    this.selectedBook = obj


  }
  telephone;


  postBook() {


    var string = "";
    var tel;
    for ( var i in this.selectedBook.isbn ) {

      string = string + this.selectedBook.isbn[i].identifier + "\n";
    }


    var obj = {};

    obj = {
      title: this.selectedBook.title,
      condition: "NA",
      course: "NA",
      department: "NA",
      description: "NA",
      isbn: string,
      numberOfCopies: 1,
      price: this.price,
      authors: this.selectedBook.author,
      image: this.selectedBook.image,
      phoneNumber: ( this.telephone ) ? this.telephone : 'NA',
      timeStamp: new Date().getTime(),
      postedDate: new Date().toDateString()
    }

    this.postBookService.postBook( obj );
    obj = {}
    $( "#exampleModal .close" ).click();
    this.backend.displayAlert( "Great", "You have succesffullly submitted your book", "success" );

  }


}
