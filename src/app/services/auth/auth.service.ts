import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth } from './auth.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private router: Router) {}

  login(auth: Auth) {
    const that = this;
    that.afa.auth.signInWithEmailAndPassword(auth.email, auth.password)
      .then(() => {
        that.router.navigate(['']);
      });
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
