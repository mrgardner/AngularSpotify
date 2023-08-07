import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SPOTIFY_AUTH } from '@app/constants/auth.constant';
import { AuthApiActions } from '@app/store/actions/auth.action';
import { getLoggedIn } from '@app/store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
    private store: Store,
    private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(AuthApiActions.authCheck())
    this.loggedIn$ = this.store.select(getLoggedIn);
    this.sessionStorageSubscription = fromEvent<StorageEvent>(window, "storage").pipe(
      filter(event => event.storageArea === sessionStorage),
      filter(event => event.key === SPOTIFY_AUTH.SPOTIFY_TOKEN),
      map(event => event.newValue)
    ).subscribe(token => {
      console.log('sdfdsfdf')
      if (token === null || token === undefined) {
        console.log('sdfdsfdf')
        this.store.dispatch(AuthApiActions.logout());
        this.router.navigate(['login']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sessionStorageSubscription.unsubscribe();
  }
}