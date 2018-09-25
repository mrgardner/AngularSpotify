import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from './user.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afa: AngularFireAuth, private afs: AngularFirestore, private router: Router) { }

  createUser(user: User) {
    const that = this;
    that.afa.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        that.afs.collection('users').doc(user.email).valueChanges()
          .subscribe(data => {
            const userObject = {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              spotifyToken: {
                token: '',
                expires: null
              }
            };
            if (data) {
              that.afs.collection('users').doc(user.email).update(userObject);
              that.router.navigate(['']);
            } else {
              that.afs.collection('users').doc(user.email).set(userObject);
              that.router.navigate(['']);
            }
          });
      });
  }
}
