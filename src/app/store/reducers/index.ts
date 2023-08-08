
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../model';
import { authReducer } from './auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer
};