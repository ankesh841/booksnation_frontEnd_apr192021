import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  buttonClicked() {
    // console.log("clicked");
    $("#wrapper").toggleClass("toggled");
  }

}
