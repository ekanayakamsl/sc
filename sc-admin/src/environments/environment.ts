// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://us-central1-test-ce3be.cloudfunctions.net',
  dash: '/',
  diningTimeEndpoint: 'diningtime',
  customerTypeEndPoint: 'customertype',
  menuItemEndPoint: 'menuItem',
  menuCategoryEndPoint: 'menuCategory',
  masterDataEndPoint: 'masterData',
  firebaseConfig: {
    apiKey: 'AIzaSyBT_cDjhMGfFWUhxvfToZTDsNHbiSO9V0U',
    authDomain: 'test-ce3be.firebaseapp.com',
    databaseURL: 'https://test-ce3be.firebaseio.com',
    projectId: 'test-ce3be',
    storageBucket: 'test-ce3be.appspot.com',
    messagingSenderId: '875192875903',
    appId: '1:875192875903:web:926e7503af0b9b7079384a',
    measurementId: 'G-82HXZKYVRZ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
