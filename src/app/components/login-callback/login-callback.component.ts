import { Component, OnInit } from '@angular/core';
import { AuthApiActions } from '@app/store/actions/auth.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login-callback',
  templateUrl: './login-callback.component.html',
  styleUrls: ['./login-callback.component.scss']
})
export class LoginCallbackComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(AuthApiActions.login());
  }
}