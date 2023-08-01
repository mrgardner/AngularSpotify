
import { ActivatedRouteSnapshot, RouterStateSnapshot, Params, UrlSegment } from '@angular/router';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import { AuthState } from '../model/auth.model';
import { authReducer } from './auth.reducer';
import { RouterReducerState, RouterStateSerializer, routerReducer } from '@ngrx/router-store';


export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params,
  urlSegments: Array<UrlSegment>,
  fragment: any
};

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

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams, fragment } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params } = state;

    // TODO: Revisit if this is needed
    // const urlSegments: Array<UrlSegment> = state['_urlSegment'].segments;
    const urlSegments: Array<UrlSegment> = [];

    return { url, queryParams, params, fragment, urlSegments };
  }
}