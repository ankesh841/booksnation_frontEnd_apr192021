import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import * as $ from "jquery";
import swal from "sweetalert2";

import { AuthorizationService } from "../authorization.service"; //service that will allow user  to sign in
import { BackendService } from "../backend.service";
import { GooglebookSearchService } from "../google-book-search.service";
import { ConnectedPositionStrategy } from "@angular/cdk/overlay";

// import hideKeyboard from "hide-virtual-keyboard";

@Component( {
  selector: "app-abbr",
  templateUrl: "./abbr.component.html",
  styleUrls: ["./abbr.component.scss"]
} )
export class AbbrComponent implements OnInit {

  searchChangeData;    //search Results been stored here
  errorNoResult = "";       //errors
  userUid;
  userEmail;

  showing_all_available_books;

  constructor( private backend: BackendService,
    private googleSearch: GooglebookSearchService,
    private cdRef: ChangeDetectorRef, public db: AngularFireDatabase, private afAuth: AngularFireAuth, private authorization: AuthorizationService, ) {
  }

  ngOnInit() {
    // this.algoliaAllAvailable();

    this.backend.algoliaSearch_showing_all_available_book().subscribe( temp => {
      this.showing_all_available_books = temp;
      console.log( 'calling first' )
    }

      ,
      af => {
        console.log( 'calleding seecond' )
        console.log( this.showing_all_available_books )
      }
      ,
      () => {
        console.log( this.showing_all_available_books )
        console.log( 'done' )
      }


    )


  }

  showProgressBar: boolean;

  filterValue;  //index names
  searchQuery_; //input value

  //to get different result on the basis of filters..
  filter() {
    var c = this.backend.inputFilter( this.searchQuery_ );
    if ( c.length > 2 ) {

      if ( this.filterValue === 'submittedBooks_lowToHigh' ) {
        this.onSearchChange( this.searchQuery_, this.filterValue );

      }
      else {

        this.onSearchChange( this.searchQuery_, "submittedBooks" );

      }

      this.backend.hidingKeyboard();  //hiding keyboard.
    }
    else {

    }


  }



  //Algolia Search
  onSearchChange( event, whichIndex ) {


    // $(this).trigger('blur');//hidee

    this.searchQuery = event;
    this.showProgressBar = true;
    this.backend.algoliaSearchBackend( event, whichIndex ).subscribe( temp => {
      this.searchChangeData = temp

      console.log( temp )

    } )
    setTimeout( () => {
      if ( this.searchChangeData ) {
        if ( this.searchChangeData.length > 0 ) {
          this.showProgressBar = false;
          this.errorNoResult = "";
          if ( this.searchChangeData ) {
            var elm = document.getElementById( "resultDiv" );
            elm.scrollIntoView();
          }
        }
        else {
          this.showProgressBar = false;
          document.getElementById( "resultDiv_2" ).scrollIntoView();
        }
      }
      else {
        this.showProgressBar = false;
        this.errorNoResult = "No Result"
        document.getElementById( "resultDiv_2" ).scrollIntoView();
      }
    }, 1000 );


  }

  progressBarAfterClickBuySearch: boolean;
  progressBarAfterClickBuyshowavailable: boolean;


  //to show captcha after button click.
  mannualContact( childValue ) {
    console.log( childValue )

    $( "#" + childValue + "_Button" ).hide();
    this.progressBarAfterClickBuySearch = true;

    $( "#" + childValue + "_captcha" ).show();

  }

  mannualContact2( childValue ) {
    console.log( childValue )


    $( "#" + childValue + "_Button2" ).hide();
    $( "#" + childValue + "_captcha2" ).show();

    // $( "#" + childValue + "_progress_available" ).show();
    // this.progressBarAfterClickBuyshowavailable = true;




  }


  algoliaAllAvailable() {

    console.log( 'algolia search available' )

    this.backend.algoliaSearch_showing_all_available_book().subscribe( temp => {
      this.showing_all_available_books = temp;
    } )

    console.log( this.showing_all_available_books );

  }




  //google captcha..
  resolvedUserInfo;

  resolved( childValue ) {
    var phone;
    for ( var i = 0; i < this.searchChangeData.length; i++ ) {
      if ( this.searchChangeData[i].childValue === childValue ) {
        console.log( this.searchChangeData[i].seller_emaiL )

        if ( this.searchChangeData[i].phoneNumber === undefined ) {
          phone = "NA"
        } else {
          phone = this.searchChangeData[i].phoneNumber;
        }
        document.getElementById( childValue + '_sec' ).innerHTML = '<object type="text/html" data="email.html" ></object>';
        document.getElementById( childValue + '_sec' ).innerHTML =
          "<strong>Seller's Email: </strong> "
          + `<a href="mailto:` + this.searchChangeData[i].seller_emaiL + `?Subject=Interested%20in%20Buying%20your%20TextBook" 
          `+ this.searchChangeData[i].tilte + `target="_top">` + this.searchChangeData[i].seller_emaiL + `</a>`
          + "<br>"
          + "<strong>Phone Number: </strong> "
          + `<a href="tel:` + this.searchChangeData[i].phoneNumber + `">` + this.searchChangeData[i].phoneNumber
          + `</a>`
          + "<br>"
          + "<strong> Seller's Name: </strong> " + this.searchChangeData[i].seller_username
      }
    }

    $( "#" + childValue + "_Button" ).hide(); //hiding the mannual button... 
    $( "#" + childValue + "_captcha" ).hide(); //hiding the mannual button... 
    setTimeout( () => {

      this.progressBarAfterClickBuySearch = false;
    }, 1000 );
  }





  resolved_showing_allAvailable( childValue ) {
    var phone;
    console.log( childValue )

    for ( var i = 0; i < this.showing_all_available_books.length; i++ ) {
      if ( this.showing_all_available_books[i].childValue === childValue ) {
        if ( this.showing_all_available_books[i].phoneNumber === undefined ) {
          phone = "NA"
        } else {
          phone = this.showing_all_available_books[i].phoneNumber;
        }
        document.getElementById( childValue ).innerHTML = '<object type="text/html" data="email.html" ></object>';
        document.getElementById( childValue ).innerHTML =
          "<strong>Seller's Email: </strong> "
          + `<a href="mailto:` + this.showing_all_available_books[i].seller_emaiL + `?Subject=Interested%20in%20Buying%20your%20TextBook" 
          `+ this.showing_all_available_books[i].tilte + `target="_top">` + this.showing_all_available_books[i].seller_emaiL + `</a>`
          + "<br>"
          + "<strong>Phone Number: </strong> "
          + `<a href="tel:` + this.showing_all_available_books[i].phoneNumber + `">` + this.showing_all_available_books[i].phoneNumber
          + `</a>`
          + "<br>"
          + "<strong> Seller's Name: </strong> " + this.showing_all_available_books[i].seller_username
      }
    }

    $( "#" + childValue + "_Button2" ).hide(); //hiding the mannual button... 
    $( "#" + childValue + "_captcha2" ).hide(); //hiding the mannual button... 

    setTimeout( () => {

      $( "#" + childValue + "_progress_available" ).show();

      // this.progressBarAfterClickBuyshowavailable = false;
    }, 1000 );
  }








  errorMessage;
  //////////////////////////////////////////////////////////////////////////////////////////
  createUsernamePassword( email, password ) {
    if ( email != "example@example.com" ) {
      this.errorMessage = "";
      var temp = "";
      this.authorization.createUsernamePassword( email, password ).then( res => {
        if ( res.user ) {
          this.globalUser = res.user;
          // this.loggedIn_alert = true; //showing sign in modal to let user sign in to create alert..
          // this.loggedIn_alert_option = true; //after sign in show modal for user to select the book..
          this.cdRef.detectChanges();
        }
      } ).catch( function ( error ) {
        temp = error.message;
      } ).then( a => {
        this.errorMessage = this.backend.displayError( temp );
        temp.length > 20 ? console.log( '' ) :
          $( "#login_modal .close" ).click()
      } );
    } else {
      this.errorMessage = "Check Email"
    }
  }




  loggedIn; //if false let user sign in , else search book to post
  searchBookError// to store error
  searchData; //to store search resultsss
  showScrollbar; // for the results..


  searchQuery;


  mannualBookNameSearch( search: string ) {
    search = this.backend.inputFilter( search );


    if ( search.length > 3 ) {
      this.backend.hidingKeyboard();
      try {
        this.searchBookError = "";
        this.searchBar = true;  //showing the progress bar
        var result = this.googleSearch.mannualBookNameSearch( search ); //getting search result from the service
        this.searchData = result; //assigning it to the var.



        setTimeout( () => {
          if ( result.length > 8 ) {
            this.showScrollbar = true;  //showing div

            this.searchBar = false;
            var elmnt = document.getElementById( "resultDiv__" );
            elmnt.scrollIntoView(); //showig the result div focus
          }
          else {
            if ( result.length <= 0 ) {
              this.searchBookError = "No Result Found, Check your key word or try again."
              this.searchBar = false;
            }
          }


        }, 2000 ); //using timeout fuctino..


      } catch ( error ) {
      }


    }

  }

  //book to create alert for.

  selectedBook; //to store selected book..
  mannualBookSelected( obj ) {
    this.selectedBook = obj;
  }



  //to open create alert model if user been logged in...
  createAlert() {
    this.afAuth.authState.subscribe( ( res ) => {
      if ( res ) {
        this.loggedIn = true
        this.userUid = res.uid;
        this.userEmail = res.email;
        this.cdRef.detectChanges();
      }
      else {

      }
    } );

  }


  ///////////
  //creating notification....
  createNotification() {
    var obj = {
      uid: this.userUid,
      email: this.userEmail,
      author: this.selectedBook.author,
      title: this.selectedBook.title
    }

    this.backend.alert( obj ).subscribe( temp => {

      if ( temp == "success" ) {

        this.backend.displayAlert( "Great", "You will recieve a notification as soon as someone uploads this or similar book. ", "success" );
        $( "#notificationModal .close" ).click(); //closing the first modal..
        $( "#close_2" ).click(); //closing the modal

      }
      else {

      }

    } );






  }
  globalUser;
  searchBar: boolean;


  loginUsernamePassword( email, password ) {
    this.globalUser = "";
    var tempError = "";
    this.authorization.loginUsernamePassword( email, password ).then( res => {
      if ( res.user ) {
        this.globalUser = res.user;
        // this.loggedIn_alert = true; //showing sign in modal to let user sign in to create alert..
        // this.loggedIn_alert_option = true; //after sign in show modal for user to select the book..
        this.cdRef.detectChanges();
      } else {
        console.log( 'cant signed..error' )
      }
    } ).catch( function ( error ) {
      tempError = error;
    } ).then( a => {
      this.errorMessage = this.backend.displayError( tempError );
    } );
  }
  hideKeyboard() {
    $( 'input:focus' ).blur();
    $( this ).trigger( 'blur' );


  }
  signInWithFacebook() {
    this.globalUser = "";
    var tempError = "";
    this.authorization.signInWithFacebook().then( res => {
      if ( res.user ) {
        this.globalUser = res.user;
        // this.loggedIn_alert = true; //showing sign in modal to let user sign in to create alert..
        // this.loggedIn_alert_option = true; //after sign in show modal for user to select the book..
        this.cdRef.detectChanges();
      } else {
        console.log( 'cant signed..error' )
      }
    } ).catch( function ( error ) {
      tempError = error;
    } ).then( a => {
      this.errorMessage = this.backend.displayError( tempError );
    } );
  }
  signInWithGoogle() {
    this.globalUser = "";
    var tempError = "";
    this.authorization.signInWithGoogle().then( res => {
      if ( res.user ) {
        this.globalUser = res.user;
        // this.loggedIn_alert = true; //showing sign in modal to let user sign in to create alert..
        // this.loggedIn_alert_option = true; //after sign in show modal for user to select the book..
        this.cdRef.detectChanges();
      } else {
        console.log( 'cant signed..error' )
      }
    } ).catch( function ( error ) {
      tempError = error;
    } ).then( a => {
      this.errorMessage = this.backend.displayError( tempError );
    } );
  }
}