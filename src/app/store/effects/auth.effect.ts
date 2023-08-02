import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { SPOTIFY_AUTH } from "@app/constants/auth.constant";
import { Router } from "@angular/router";
import { AuthPayload } from "../model/auth.model";
import { selectFragment } from "../selectors/router.selectors";
import { AuthApiActions } from "../actions/auth.action";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private store: Store, private router: Router) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.login),
    withLatestFrom(this.store.select(selectFragment)),
    switchMap((latest: any) => {
      const fragment = latest[1];
      const authToken: string = fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&')[0];
      const expiredDate: Date = new Date();
      expiredDate.setHours(expiredDate.getHours() + 1);

      sessionStorage.setItem(SPOTIFY_AUTH.SPOTIFY_TOKEN, authToken);
      sessionStorage.setItem(SPOTIFY_AUTH.EXPIRED_DATE, expiredDate.toDateString());
      const data: AuthPayload = { authToken, expiredDate: expiredDate.toString() };
      return of(data).pipe(
        map(() => AuthApiActions.storeAuthToken({ payload: data })),
      )
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.logout),
    switchMap(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
      return of(1).pipe(
        map(() => AuthApiActions.removeAuthToken()),
        catchError(error => of(AuthApiActions.authError(error)))
      );
    })
  ));

  storeAuthToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.storeAuthToken),
    tap(() => this.router.navigate(['dashboard']))
  ), { dispatch: false });

  authCheck$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.authCheck),
    switchMap(() => {
      const authToken = sessionStorage.getItem(SPOTIFY_AUTH.SPOTIFY_TOKEN) !== null ? sessionStorage.getItem(SPOTIFY_AUTH.SPOTIFY_TOKEN) : false;
      const expiredDate = sessionStorage.getItem(SPOTIFY_AUTH.EXPIRED_DATE) !== null ? sessionStorage.getItem(SPOTIFY_AUTH.EXPIRED_DATE) : false;
      if (authToken && expiredDate) {
        const data = { authToken, expiredDate };
        return of(1).pipe(
          map(() => AuthApiActions.storeAuthToken({ payload: data }))
        )
      } else {
        this.router.navigate(['login']);
        return of(1).pipe(
          map(() => AuthApiActions.authError({ payload: { code: 500, message: 'Something went wrong' } }))
        )
      }
    })
  ));
}