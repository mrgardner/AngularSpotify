
import { ActionReducerMap } from '@ngrx/store'
import { routerReducer } from '@ngrx/router-store';
import { authReducer } from './auth.reducer';
import { AppState } from '../model';



export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer
};