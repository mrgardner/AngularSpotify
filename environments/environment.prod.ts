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
