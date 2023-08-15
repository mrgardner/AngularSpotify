import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor() { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // TODO: FIX BELOW LOGS OUT ON PAGE REFRESH
    // this.store.dispatch(AuthApiActions.authCheck());
    // return this.store.select(selectLoggedIn).pipe(map((value: boolean) => value))
    return true;
  }
}