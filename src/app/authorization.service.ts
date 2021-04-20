import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class AuthorizationService {
  private user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  signInWithFacebook() {
    // return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());

    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  signInWithGoogle() {

    var googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.afAuth.auth.signInWithPopup(googleAuthProvider);
  }

  //for regestring new users.
  createUsernamePassword(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  //if user wants to log in using email and password.
  loginUsernamePassword(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.afAuth.auth.signOut();
  }

}
