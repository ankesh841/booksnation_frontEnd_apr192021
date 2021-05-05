/**
 * * 
 *Requested book is pending......
 * 
 */

import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import * as $ from "jquery";
import { AuthorizationService } from "../authorization.service"; //service that will allow user  to sign in
import { BackendService } from "../backend.service";
import swal from "sweetalert2";

@Component( {
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
} )

export class LoginComponent implements OnInit {

  loginProgressBar: boolean; //showing login progerss bar
  constructor( public afAuth: AngularFireAuth, public db: AngularFireDatabase, private backend: BackendService, private cdRef: ChangeDetectorRef, public router: Router, private authService: AuthorizationService ) {
    this.afAuth.authState.subscribe( ( res ) => {
      if ( res ) {
        this.username = res.displayName;
        this.email_logged = res.email;
        this.login_null = true;
        this.globalUser = res;
        if ( !this.username ) {
          swal(
            {
              title: 'enter your  name',
              input: 'text',
              backdrop: "static",
              allowOutsideClick: false,
              keydownListenerCapture: false,
              inputPlaceholder: 'Enter your name',
              inputValidator: ( value ) => {
                if ( value.length > 3 && value ) {
                  res.updateProfile(
                    {
                      displayName: value,
                      photoURL: "#"
                    } ).then( function () { }, function ( error ) { } );
                  return;
                }
                else {
                  return 'you need to write someethit';
                }
                // return !value && 'You need to write something!'
              }
            } ).then( function ( result ) { } ).catch( swal.noop )
        }
      }
      else {
        this.login_null = false;
      }
    } );
  }
  phoneNumber;
  displayNameUser;
  ankeshdasjk: any;
  hero: any;
  email_logged;
  abbrArr: Array<string>;
  cNumArr: Array<string>;
  isbn: string;
  booktTitle: string;
  email: string;
  pasword: string;
  login_null: boolean;
  username;
  errorMessage;
  conditions = ["Average", "Good", "Excellent"];
  currentCondition;
  imageLink: string;
  authors: string;
  globalIsbn: string;
  globalUser;
  postedBooksByUser: any;
  requestedBooksByUser: any; //working on..
  showPostedBooks: boolean;
  showRequestedBooks: boolean;
  submittingUserInfo = {};
  department;
  coursenumber;
  @Output()


  loggedIn = new EventEmitter<boolean>();

  login() {
    this.loggedIn.emit( true );
  }

  ngOnInit() {

    this.afAuth.authState.subscribe( rs => {
      if ( rs ) {
        this.router.navigate( ['/postBook/postBySearch'] );
      }


    } );
  }
  bookSearch = [];
  searchBookError = "";
  showScrollbar: boolean;

  active: boolean;
  postedbook: boolean;



  signInwithEmailandpassword( email, password ) {
    var temp = "";
    this.loginProgressBar = true;
    var user_temp;
    this.submittingUserInfo = {};
    this.authService.loginUsernamePassword( email, password ).then( a => {
      if ( a.user ) {
        this.loginProgressBar = false
        this.globalUser = a.user;
        user_temp = a.user;
        this.login_null = true;
        this.loginProgressBar = false


        this.cdRef.detectChanges();

        this.router.navigate( ['/postBook/postBySearch'] );


        this.submittingUserInfo = {
          email: user_temp.email,
          photoUrl: user_temp.photoURL,
          userid: user_temp.uid,
          username: user_temp.displayName
        }



        this.backend.submitUserInfo( this.submittingUserInfo ).subscribe( s => { } )
      }
    } ).catch( function ( error ) {
      temp = error.message;
    } ).then( a => {
      this.errorMessage = temp;
    } )
  }


  createUsernamePassword( email, password ) {
    var temp = "";
    var user_temp;
    this.loginProgressBar = true;
    this.submittingUserInfo = {};
    this.authService.createUsernamePassword( email, password ).then( a => {
      if ( a.user ) {
        this.globalUser = a.user;
        this.loginProgressBar = false;
        user_temp = a.user;
        this.login_null = true;
        this.cdRef.detectChanges();
        this.loginProgressBar = false


        this.submittingUserInfo = {
          email: user_temp.email,
          photoUrl: user_temp.photoURL,
          userid: user_temp.uid,
          username: user_temp.displayName
        }
        this.backend.submitUserInfo( this.submittingUserInfo ).subscribe( s => { } )
      }
    } ).catch( function ( error ) {
      temp = error.message;
    } ).then( a => {
      this.errorMessage = temp;
    } )
  }
  signInWithFacebook() {

    this.loginProgressBar = true;
    var temp = "";
    var user_temp;
    this.submittingUserInfo = {};
    this.authService.signInWithFacebook().then( a => {
      if ( a.user ) {
        this.globalUser = a.user;
        user_temp = a.user;
        this.login_null = true;
        this.loginProgressBar = false


        this.cdRef.detectChanges();
        this.submittingUserInfo = {
          email: user_temp.email,
          photoUrl: user_temp.photoURL,
          userid: user_temp.uid,
          username: user_temp.displayName
        }
        this.backend.submitUserInfo( this.submittingUserInfo ).subscribe( s => { } )
      }

    } ).catch( function ( error ) {
      console.log( error )
      temp = error.message;

    } ).then( a => {
      console.log( temp )
      this.errorMessage = temp;
      this.cdRef.detectChanges();
    } )
  }



  signInWithGoogle() {
    this.loginProgressBar = true;
    var temp = "";
    var user_temp;
    this.submittingUserInfo = {};
    this.authService.signInWithGoogle().then( a => {

      if ( a.user ) {
        this.globalUser = a.user;

        user_temp = a.user;
        this.login_null = true;
        this.loginProgressBar = false
        this.cdRef.detectChanges();

        this.submittingUserInfo = {
          email: user_temp.email,
          photoUrl: user_temp.photoURL,
          userid: user_temp.uid,
          username: user_temp.displayName
        }
        this.backend.submitUserInfo( this.submittingUserInfo ).subscribe( s => { } )
      }
    } ).catch( function ( error ) {
      temp = error.message;
    } ).then( a => {
      this.errorMessage = temp;
    } )
  }


  logout() {
    this.authService.logOut().then( a => {
      this.login_null = false;
      this.cdRef.detectChanges();
    } );
  }
  displayError( errorCode ) {
    if ( errorCode === "auth/user-not-found" ) {
      this.errorMessage = "User doesn't exists, Check Email or Sign Up to proceed.";
    }
    else if ( errorCode === "auth/wrong-password" ) {
      this.errorMessage = "Invalid password";
    }
    else {
      this.errorMessage = errorCode;
    }
  }
}