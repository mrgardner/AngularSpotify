import { Injectable } from "@angular/core";
// import { UserDisplayName } from "@app/interfaces/user/user.interface";
// import { ApolloService } from "@app/services/apollo/apollo.service";
// import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { of } from "rxjs";
// import { catchError, map, switchMap } from "rxjs/operators";
// import * as userActions from '../../store/actions/user.action';

@Injectable()
export class UserEffects {
  // constructor(private actions$: Actions, private apolloService: ApolloService) { }

  // TODO: FIX EFFECTS
  // loadUser$ = createEffect(() => this.actions$.pipe(
  //   ofType(userActions.LOAD_USER),
  //   switchMap(() => {
  //     return this.apolloService.getUserDisplayName().pipe(
  //       map((user: UserDisplayName) => new userActions.LoadUserSuccess(user.display_name)),
  //       catchError(error => of(new userActions.LoadUserFail(error)))
  //     );
  //   })
  // ))
}