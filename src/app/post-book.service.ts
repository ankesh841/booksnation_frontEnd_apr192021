import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class PostBookService {

  constructor(private backend: BackendService, public afAuth: AngularFireAuth) { }

  postBook(obj) {
    var user = this.afAuth.auth.currentUser;
    obj.uid = user.uid;
    obj.seller_emaiL = user.email;
    obj.seller_username = user.displayName;

    this.backend.postBook(obj).subscribe(temp => {
      console.log(temp);
    });
  }

}