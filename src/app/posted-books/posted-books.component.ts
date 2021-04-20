import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { AngularFireAuth } from '@angular/fire/auth';
import swal from "sweetalert2";
import * as $ from 'jquery';
import { GooglebookSearchService } from '../google-book-search.service';
// import { futimes } from 'fs';

// import * as Fuse from 'fuse.js';


@Component({
  selector: 'app-posted-books',
  templateUrl: './posted-books.component.html',
  styleUrls: ['./posted-books.component.css']
})
export class PostedBooksComponent implements OnInit {
  searchBar: boolean;


  postedBooksByUser;  //array to contain all books data posted by user.
  constructor(private backend: BackendService, private afAuth: AngularFireAuth, private googleService: GooglebookSearchService) {
    this.afAuth.authState.subscribe((res) => {
      if (res) {
        this.backend.getPostedBook(res.uid).subscribe(temp => {
          this.postedBooksByUser = temp;
        });
        if (this.postedBooksByUser) {
          this.searchBar = true;
        }
      }
    });
  }

  ngOnInit() {
  }

  //searc wihin in posted books

  noResultError;//showing no result.
  filter(query) {
    query = this.backend.inputFilter(query);
    if (query.length > 3) {

      var books = this.postedBooksByUser;
      var options = {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        keys: ["title", 'authors']
      };

      var elm = document.getElementById('resultsDiv');
      elm.scrollIntoView();

      this.backend.hidingKeyboard();

    }

  }

  showPostedBooks() {
    this.afAuth.authState.subscribe((res) => {

      if (res) {
        this.backend.getPostedBook(res.uid).subscribe(temp => {

          console.log(temp)

          this.postedBooksByUser = temp;

          var elm = document.getElementById('resultsDiv');
          elm.scrollIntoView();

        });
        if (this.postedBooksByUser) {
          this.searchBar = true;
        }

      }


    });
  }


  /**Deleting the post
   * 
   * @param data is the child which will be delted.
   */

  deleteThis(data) {
    var data2 = document.getElementById(data);
    swal({
      title: "Are you sure?",
      text: "This post will be deleted.",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it",
      showConfirmButton: true,

    }).then((result) => {
      if (result.value) {
        this.backend.removePost(data).subscribe(temp => {
          $(data2).remove();  //deleting the htmlPost locally..
        })
        swal(
          "Deleted",
          "This post has been deleted",
          "success"
        )
      }
      else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          "Cancelled",
          "This post is still good",
          "info"
        )

      }
    })
  }
}