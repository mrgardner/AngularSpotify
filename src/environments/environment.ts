// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyDp_OOz_ZGTCCHyv9DCNPFtdHZOUGEovXQ',
    authDomain: 'angular-spotify.firebaseapp.com',
    databaseURL: 'https://angular-spotify.firebaseio.com',
    projectId: 'angular-spotify',
    storageBucket: 'angular-spotify.appspot.com',
    messagingSenderId: '8033131652'
  },
  spotify: {
    authURI: 'https://accounts.spotify.com/authorize?',
    loginResponseType: 'token',
    clientID: '8533e022572d49caa870cfb4fb5c6e90',
    scope: 'user-read-playback-state ' +
      'user-read-currently-playing ' +
      'user-modify-playback-state ' +
      'streaming app-remote-control ' +
      'playlist-read-collaborative ' +
      'playlist-modify-private ' +
      'playlist-modify-public ' +
      'playlist-read-private ' +
      'user-read-birthdate ' +
      'user-read-email ' +
      'user-read-private ' +
      'user-library-read ' +
      'ugc-image-upload',
    redirectURI: 'http://localhost:4200/callback'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
