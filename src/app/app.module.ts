import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
//material
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
//
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // angular bootstrap.
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";
import { RecaptchaModule } from 'ng-recaptcha'; //old
import { environment } from "../environments/environment";
import { AbbrComponent } from "./abbr/abbr.component";
import { AboutComponent } from "./about/about.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatDividerModule } from '@angular/material/divider';

import { MatFormFieldModule } from '@angular/material/form-field';


import { MatIconModule } from '@angular/material';

import { NgAisModule } from 'angular-instantsearch';
import { NavigationComponent } from './navigation/navigation.component';
import { PostPageComponent } from './post-page/post-page.component';
import { PostedBooksComponent } from './posted-books/posted-books.component';

const appRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "home",
    component: AbbrComponent,
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: "postedBooks",
    component: PostedBooksComponent,
  },
  {
    path: "postBook/:query",
    component: PostPageComponent,
  }

];

@NgModule({
  declarations: [
    AppComponent,
    AbbrComponent,
    AboutComponent,
    LoginComponent,
    NavigationComponent,
    PostPageComponent,
    PostedBooksComponent
  ],
  imports: [
    NgbModule,
    // NgbPopover,
    NgAisModule.forRoot(),
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    // NgbPopover,
    MatTooltipModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatButtonModule,
    MatRadioModule,
    MatGridListModule,
    MatInputModule,
    MatProgressBarModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: "modal-content",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn"
    }),
    RecaptchaModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }