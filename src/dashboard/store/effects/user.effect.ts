import { Injectable } from "@angular/core";
import { ApolloService } from "@app/services/apollo/apollo.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { UserApiActions } from "../actions/user.action";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private apolloService: ApolloService) { }

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserApiActions.loadUser),
    switchMap(() => this.apolloService.getUserDisplayName().pipe(
      map((displayName: string) => UserApiActions.loadUserSuccess({ payload: displayName })),
      catchError(error => of(UserApiActions.loadUserFail(error)))
    ))
  ))
}