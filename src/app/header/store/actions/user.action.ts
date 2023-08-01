import { Action } from '@ngrx/store';

// load user
export const LOAD_USER = '[User] Load User';
export const LOAD_USER_FAIL = '[User] Load User Fail';
export const LOAD_USER_SUCCESS = '[User] Load User Success';

export class LoadUser implements Action {
  readonly type = LOAD_USER;
}

export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;
  constructor(public payload: any) { }
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: string) { }
}

// action types

export type UserAction = LoadUser | LoadUserFail | LoadUserSuccess;