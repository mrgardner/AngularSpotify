import { Action } from '@ngrx/store';

// load auth
export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const STORE_AUTH_TOKEN = '[Auth] Store Auth Token';
export const REMOVE_AUTH_TOKEN = '[Auth] Remove Auth Token';
export const AUTH_ERROR = '[Auth] Error';
export const AUTH_CHECK = '[Auth] Check';


interface AuthPayload {
  authToken: string;
  expiredDate: string;
}

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class StoreAuthToken implements Action {
  readonly type = STORE_AUTH_TOKEN;
  constructor(public payload: AuthPayload) { }
}

export class RemoveAuthToken implements Action {
  readonly type = REMOVE_AUTH_TOKEN;
}

export class AuthCheck implements Action {
  readonly type = AUTH_CHECK;
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload: any) { }
}

// action types

export type UserAction = Login | Logout | StoreAuthToken | RemoveAuthToken | AuthError | AuthCheck;