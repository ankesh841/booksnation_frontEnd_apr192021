import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";


import { FacebookService, InitParams } from 'ngx-facebook';

@Component( {

  selector: "app-root",
  templateUrl: "./app.component.html"

} )

export class AppComponent {
  title = "booksdart";

  // constructor( private facebookService: FacebookService ) { }
  // ngOnInit(): void {
  //   this.initFacebookService();
  // }
  // private initFacebookService(): void {
  //   const initParams: InitParams = { xfbml: true, version: 'v3.2' };
  //   this.facebookService.init( initParams );
  // }



}
