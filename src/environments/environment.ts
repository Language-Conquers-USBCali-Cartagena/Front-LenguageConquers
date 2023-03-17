// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const environment = {
  firebase: {
    projectId: 'languageconquers-740dc',
    appId: '1:373075886736:web:b77a7df1224f79b4504e15',
    storageBucket: 'languageconquers-740dc.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyCIzdgQ0ZYcy4kERBtiP7fXZh1itvZAdcI',
    authDomain: 'languageconquers-740dc.firebaseapp.com',
    messagingSenderId: '373075886736',
    measurementId: 'G-R8EJ8PT8KQ',
  },
  production: false,
  endpoint:'https://languageconquers.herokuapp.com'
  //'https://languageconquers.herokuapp.com'
  //endpoint: 'http://localhost:8086'

};
const firebaseApp = initializeApp(environment.firebase);
const storage = getStorage(firebaseApp);
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
