import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { GooglebookSearchService } from '../google-book-search.service';
import { PostBookService } from '../post-book.service';
import * as $ from 'jquery';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ContentObserver } from '@angular/cdk/observers';
@Component( {
  selector: 'app-post-page-with-details',
  templateUrl: './post-page-with-details.component.html',
  styleUrls: ['./post-page-with-details.component.css']
} )
export class PostPageWithDetailsComponent implements OnInit {
  allDepartments; //array to store all deparments.c
  department; //value of selected dep
  course;  //value of selected course
  conditionArray; //to store conditions...
  query;
  showScrollbar;  //showing the result
  searchBookError;
  bookSearch; // array to store search results.
  comment;
  condition;  //selected condition.
  price;  //entered price
  error: boolean;
  selectedBook; //array to store selected book
  searchingBar: boolean;
  disablingButton: boolean; //to make sure user has given all of the informaiton.
  telephone;// telephone number 
  hidePage: boolean;
  constructor( private backend: BackendService,
    private googleSearch: GooglebookSearchService,
    private postbookService: PostBookService,
    private afAuth: AngularFireAuth, private router: Router ) {
    this.afAuth.authState.subscribe( ( res ) => {
      if ( !res ) {
        this.router.navigate( ["/"] ).then( result => { window.location.href = '/login'; } );
      } else {
        this.hidePage = true;
      }
    } )
  }
  collegeArray = [];
  college = [];
  departmentFromCollegeArray = [];
  ngOnInit() {
    this.backend.getAbbrDepartments().subscribe( temp => {
      this.allDepartments = Array.from( temp.valueOf() );
    } );
    this.backend.getCollege().subscribe( temp => {
      this.college.push( temp )
      // console.log( this.college )
      // this.college.forEach( temp => {
      //   console.log( temp )
      // } )
    } )
    this.conditionArray = ['Excellent', 'Good', 'Average'];
  }
  departmentFromCollege;
  //resetting result as soon as changes in department and course.
  resettingResult() {
    // console.log( 'selection change' )
    // console.log( this.department )
    this.departmentFromCollegeArray = [];
    this.college[0].forEach( temp => {
      if ( temp.collegeName === this.collegeName_ ) {

        var temparr = [...temp.collegeCourse]
        temparr.forEach( temp => {

          this.departmentFromCollegeArray.push( temp )
        } )
      }
    } )
    // this.bookSearch = [];
  }
  mannualBookNameSearch( search: string ) {

    // search = this.backend.inputFilter( search );




    // if ( !this.department && !this.course ) {
    //   this.searchBookError = "Select Department and Course"
    //   this.backend.hidingKeyboard();
    // }

    // else {
    if ( search.length > 3 ) {
      this.backend.hidingKeyboard();
      try {
        this.searchBookError = "";
        this.searchingBar = true;  //showing the progress bar
        var result = this.googleSearch.mannualBookNameSearch( search ); //getting search result from the service
        this.bookSearch = result; //assigning it to the var.
        this.showScrollbar = true;  //showing div
        setTimeout( () => {
          if ( result.length > 1 ) {
            this.searchingBar = false;
            var elmnt = document.getElementById( "resultDiv" );
            elmnt.scrollIntoView(); //showing the result div focus
          }
          else {
            this.searchBookError = "No Result Found, Check your key word"
            this.searchingBar = false;
          }
        }, 2000 ); //using timeout fuctino..
      } catch ( error ) {
      }
    }
    // }
  }
  //initilizing.. when we select the different book..
  selectedBook_( obj ) {
    this.price = undefined;
    this.condition = undefined
    this.comment = ' ';
    this.selectedBook = obj;
  }
  //posting book
  collegeName_;
  postBook() {
    var string = "";
    var tel;
    for ( var i in this.selectedBook.isbn ) {
      string = string + this.selectedBook.isbn[i].identifier + "\n";
    }
    var obj = {};
    obj = {
      title: this.selectedBook.title,
      condition: this.condition,
      course: ( this.course ) ? this.course : "NA",
      collegeName: this.collegeName_,
      department: ( this.departmentFromCollege ) ? this.departmentFromCollege : "NA",
      description: this.comment,
      isbn: string,
      numberOfCopies: 1,
      price: this.price,
      authors: this.selectedBook.author,
      image: this.selectedBook.image,
      phoneNumber: ( this.telephone ) ? this.telephone : 'NA',
      timeStamp: new Date().getTime(),
      postedDate: new Date().toDateString()

    }
    this.postbookService.postBook( obj );
    obj = {}

    $( "#exampleModal .close" ).click();  //closing the modal
    this.backend.displayAlert( "Great", "You have succesffullly submitted your book", "success" );  //displaying the message..
  }
}
