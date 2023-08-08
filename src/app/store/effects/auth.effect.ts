import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { SPOTIFY_AUTH } from "@app/constants/auth.constant";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { map, tap, withLatestFrom } from "rxjs/operators";
import { AuthApiActions } from "../actions/auth.action";
import { AuthPayload } from "../model/auth.model";
import { selectAuthToken } from "../selectors/auth.selectors";
import { selectFragment } from "../selectors/router.selectors";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private store: Store, private router: Router) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.login),
    withLatestFrom(this.store.select(selectFragment)),
    map((latest: any) => {
      const fragment = latest[1];
      const authToken: string = fragment.split(SPOTIFY_AUTH.ACCESS_TOKEN)[1].split('&')[0];
      const expiredDate: Date = new Date();
      expiredDate.setHours(expiredDate.getHours() + 1);

      sessionStorage.setItem(SPOTIFY_AUTH.SPOTIFY_TOKEN, authToken);
      sessionStorage.setItem(SPOTIFY_AUTH.EXPIRED_DATE, expiredDate.toDateString());
      const data: AuthPayload = { authToken, expiredDate: expiredDate.toString() };
      return AuthApiActions.storeAuthToken({ payload: data });
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.logout),
    map(() => AuthApiActions.removeAuthToken())
  ));

  removeAuthToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.removeAuthToken),
    tap(() => this.router.navigate(['login']))
  ), { dispatch: false });

  storeAuthToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.storeAuthToken),
    tap(() => this.router.navigate(['dashboard']))
  ), { dispatch: false });

  authCheck$ = createEffect(() => this.actions$.pipe(
    ofType(AuthApiActions.authCheck),
    withLatestFrom(this.store.select(selectAuthToken)),
    map((latest: any) => {
      console.log(latest)
      if (latest[1]) {
        return AuthApiActions.authNOOP();
      } else {
        return AuthApiActions.logout();
      }
    })
  ));
}