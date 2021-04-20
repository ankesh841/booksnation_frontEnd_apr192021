// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebase: {
    apiKey: "AIzaSyA77CMnccmWSuX-cgzFkT8RjPRQbeJJ25k",
    // authDomain: "auth.booksnation.ca",

    authDomain: "bookstore2july24.firebaseapp.com",

    databaseURL: "https://bookstore2july24.firebaseio.com",
    projectId: "bookstore2july24",
    storageBucket: "bookstore2july24.appspot.com",
    messagingSenderId: "581038020415"
  }

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
