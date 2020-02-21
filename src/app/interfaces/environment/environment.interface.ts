export interface Environment {
  production: boolean;
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  };
  spotify: {
    authURI: string;
    loginResponseType: string;
    clientID: string;
    scope: string;
    redirectURI: string;
  }
}
