import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as authActions from '../../store/actions/auth.action';
import * as fromStore from '@app/store';
import { SPOTIFY_AUTH } from "@app/constants/auth.constant";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private store: Store, private router: Router) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.LOGIN),
    switchMap(() => this.store.select(fromStore.getRouterFragment)),
    switchMap((fragment: string) => {
      if (fragment && fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN).length === 2 && fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&').length === 4) {
        const authToken: string = fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&')[0];
        const expiredDate: Date = new Date();
        expiredDate.setHours(expiredDate.getHours() + 1);

        sessionStorage.setItem(SPOTIFY_AUTH.SPOTIFY_TOKEN, authToken);
        sessionStorage.setItem(SPOTIFY_AUTH.EXPIRED_DATE, expiredDate.toDateString());
        const data = { authToken, expiredDate: expiredDate.toString() };
        this.router.navigate(['dashboard']);
        return of(data).pipe(
          map(() => new authActions.StoreAuthToken(data))
        )
      } else {
        return of(1).pipe(
          map(() => new authActions.AuthError({ code: 500, message: 'Something went wrong' }))
        )
      }
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.LOGOUT),
    switchMap(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return of(1).pipe(
        map(() => new authActions.RemoveAuthToken()),
        catchError(error => of(new authActions.AuthError(error)))
      );
    })
  ));

  authCheck$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.AUTH_CHECK),
    switchMap(() => {
      const authToken = sessionStorage.getItem(SPOTIFY_AUTH.SPOTIFY_TOKEN) !== null ? sessionStorage.getItem(SPOTIFY_AUTH.SPOTIFY_TOKEN) : false;
      const expiredDate = sessionStorage.getItem(SPOTIFY_AUTH.EXPIRED_DATE) !== null ? sessionStorage.getItem(SPOTIFY_AUTH.EXPIRED_DATE) : false;
      if (authToken && expiredDate) {
        const data = { authToken, expiredDate };
        return of(1).pipe(
          map(() => new authActions.StoreAuthToken(data))
        )
      } else {
        this.router.navigate(['login']);
        return of(1).pipe(
          map(() => new authActions.AuthError({ code: 500, message: 'Something went wrong' }))
        )
      }
    })
  ));
}