
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params, UrlSegment } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from './auth.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params,
  urlSegments: Array<UrlSegment>,
  fragment: any
};

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>
  auth: fromAuth.AuthState
};

export const reducers: ActionReducerMap<State> = {
  router: fromRouter.routerReducer,
  auth: fromAuth.authReducer
};

export const getRouterReducerState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');
export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams, fragment } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    // TODO: Revisit if this is needed
    const urlSegments: Array<UrlSegment> = state['_urlSegment'].segments;

    return { url, queryParams, params, fragment, urlSegments };
  }
}