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
    scope: 'ugc-image-upload ' +
      'user-read-playback-state ' +
      'user-modify-playback-state ' +
      'user-read-currently-playing ' +
      'app-remote-control ' +
      'streaming ' +
      'playlist-read-private ' +
      'playlist-read-collaborative ' +
      'playlist-modify-private ' +
      'playlist-modify-public ' +
      'user-follow-modify ' +
      'user-follow-read ' +
      'user-read-playback-position ' +
      'user-top-read ' +
      'user-read-recently-played ' +
      'user-library-modify ' +
      'user-library-read ' +
      'user-read-email ' +
      'user-read-private ',
    redirectURI: 'http://localhost:4200/callback'
  }
};
