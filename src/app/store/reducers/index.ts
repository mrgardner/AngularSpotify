
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import { RouterStateUrl } from '../model/router.model';
import { AuthState } from '../model/auth.model';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { authReducer } from './auth.reducer';

export interface State {
  router: RouterReducerState<RouterStateUrl>
  auth: AuthState
};

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  auth: authReducer
};

export const getRouterReducerState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');
export const getAuthState = createFeatureSelector<AuthState>('auth');