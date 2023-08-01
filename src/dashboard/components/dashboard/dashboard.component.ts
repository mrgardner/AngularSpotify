// Common
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
// import * as fromStore from '@app/store';
import { SPOTIFY_AUTH } from '@app/constants/auth.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {
  private sessionStorageSubscription: Subscription;
  public loggedIn$: Observable<boolean>;
  constructor(
    // private store: Store,
    private router: Router) { }

  ngOnInit(): void {
    // TODO: FIX SELECTORS
    // this.store.dispatch(new fromStore.AuthCheck())
    // this.loggedIn$ = this.store.select(fromStore.getLoggedIn);
    this.sessionStorageSubscription = fromEvent<StorageEvent>(window, "storage").pipe(
      filter(event => event.storageArea === sessionStorage),
      filter(event => event.key === SPOTIFY_AUTH.SPOTIFY_TOKEN),
      map(event => event.newValue)
    ).subscribe(token => {
      console.log('sdfdsfdf')
      if (token === null || token === undefined) {
        console.log('sdfdsfdf')
        // TODO: FIX SELECTORS
        // this.store.dispatch(new fromStore.Logout());
        this.router.navigate(['login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sessionStorageSubscription.unsubscribe();
  }
}
