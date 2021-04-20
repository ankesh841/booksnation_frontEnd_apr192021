import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  showingLogOut: boolean;
  // showingPostOptions: boolean;
  loggedIn = false;

  constructor(private afAuth: AngularFireAuth, private cdRef: ChangeDetectorRef, private _router: Router) {
    this.afAuth.authState.subscribe((res) => {
      if (res) {
        this.showingLogOut = true;
        //this.showingPostOptions = true;
        this.cdRef.detectChanges();
      }
      else {
        //  this.showingPostOptions = false;
        this.showingLogOut = false;
        this.cdRef.detectChanges();
      }
      this.cdRef.detectChanges();
    });

  }

  /**checks if url contains login keyword
   * if so bool would be true
   *  ->all other components would be hidden, except login panle.
   */

  ngOnInit(): void {
    //////////////////////////////////to reload the page..
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    // ////////////////////////

    if (window.location.href.indexOf("login") > -1) {
      this.loggedIn = true;
      this.bool = false;
    }
    else { this.bool = true; }
  }

  bool: boolean;
  logOut() {
    this.afAuth.auth.signOut();
  }

}
