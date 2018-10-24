import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth } from './auth.interface';
import {Router} from '@angular/router';
import { reject } from 'q';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private router: Router) {}

  login(auth: Auth): Promise<Boolean> {
    const that = this;
    return new Promise((resolve, reject) => {
      that.afa.auth.signInWithEmailAndPassword(auth.email, auth.password)
        .then(() => {
          that.router.navigate(['']);
          resolve(true);
        })
        .catch(() => {
          reject(false);
        }));
  }

  isLoggedIn() {
    return this.afa.authState;
  }

  logout() {
    this.afa.auth.signOut();
  }

  isAuthenticated() {
    return this.afa.user;
  }
}
