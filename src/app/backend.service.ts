import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import swal from "sweetalert2";

import * as $ from 'jquery';

@Injectable( {
  providedIn: "root"
} )
export class BackendService {
  constructor(
    private http: HttpClient,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) { }

  //headers for post requrest.
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    } )
  };


  sendDataBool = false;

  // private rootUrl = "http://localhost:3000";
  private rootUrl = ".."; //if uploading..
  // 
  //  private rootUrl = "https://booksnation-working.herokuapp.com";

  onlyUnique( value, index, self ) {
    return self.indexOf( value ) === index;
  }

  inputFilter( query ) {

    var a = $.trim( query );
    return a.replace( /[^a-z0-9]/gi, '' );
  }

  //hiding keyboard after button press
  hidingKeyboard() {
    setTimeout( () => {
      $( 'input:focus' ).blur();
    }, 500 );
  }

  algoliaSearchBackend( searchString, filterValue ) {
    var obj = {
      searchString: searchString,
      indexName: filterValue
    }
    return this.http.post( this.rootUrl + "/search", obj, this.httpOptions );
  }



  algoliaSearch_showing_all_available_book() {
    var obj = {};
    return this.http.post( this.rootUrl + '/showingAllAvailable', obj, this.httpOptions );
  }


  //creating alert

  alert( obj ) {
    return this.http.post( this.rootUrl + "/alert", obj, this.httpOptions );
  }

  //google search...
  mannualBookSearch_loginPanel( searchString: string ) {
    var obj = {
      searchstring: searchString
    }
    return this.http.post( this.rootUrl + "/mannualBookSearch_loginPanel", obj, this.httpOptions );
  }

  //remove post
  removePost( childValue ) {
    var obj = {
      val: childValue
    }
    return this.http.post( this.rootUrl + '/remove', obj, this.httpOptions );
  }



  getBookdetailFromIsbn( isbn ) {
    var obj = {
      isbn: isbn
    }

    // return this.http.get(this.rootUrl + "/nodeisbn/" + isbn);
    return this.http.post( this.rootUrl + "/nodeisbn", obj, this.httpOptions );

  }


  getUserDetail( uid ) {
    console.log( uid )

    var obj = {
      uid: uid
    }
    return this.http.post( this.rootUrl + "/userDetail", obj, this.httpOptions );

  }



  getAbbrDepartments(): any {
    return this.http.post( this.rootUrl + "/departmentsAbr", this.httpOptions );
    // return this.http.get(this.rootUrl + "/departmentsAbr");
  }




  //to opst the bookk...
  postBook( object ) {
    return this.http.post( this.rootUrl + '/postBook', object, this.httpOptions );
  }

  getPostedBook( uid ) {
    var obj = {
      uid: uid
    }
    return this.http.post( this.rootUrl + "/submittedBooksData", obj, this.httpOptions );
  }


  submitUserInfo( obj ) {
    return this.http.post( this.rootUrl + "/savingUserInfo", obj, this.httpOptions );
  }

  displayError( errorCode ) {
    var errorMessage = "";
    if ( errorCode === "auth/user-not-found" ) {
      errorMessage = "User doesn't exists, Check Email or Sign Up to proceed.";
    } else if ( errorCode === "auth/wrong-password" ) {
      errorMessage = "Invalid password";
    } else {
      errorMessage = errorCode;
    }
    return errorMessage;
  }


  displayAlert( title, message, type ) {
    swal( {
      title: title,
      text: message,
      type: type
    } ).then( ( resul ) => {
    } );
  }




}
