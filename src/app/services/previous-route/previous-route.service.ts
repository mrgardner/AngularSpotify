import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {
  private currentUrl: string;
  private previousUrl: string;
  constructor(private router: Router, private afs: AngularFirestore, private afa: AngularFireAuth) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  getPreviousRoute() {
    this.afa.user.subscribe(user => {
      if (user) {
        this.afs.collection('users').doc(user['email']).update({lastRoute: this.previousUrl});
      }
    });
  }
}
