import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Auth } from '../../interfaces/auth/auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afa: AngularFireAuth) {}

  login(auth: Auth): Promise<Object> {
    return this.afa.auth.signInWithEmailAndPassword(auth.email, auth.password);
  }

  logout(): void {
    this.afa.auth.signOut();
  }

  isAuthenticated(): Observable<Object> {
    return this.afa.user;
  }
}
