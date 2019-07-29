import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { counterReducer } from './counter.reducer';
import {
  apolloReducer,
} from 'apollo-angular-cache-ngrx';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  count: counterReducer,
  myCustomApollo: apolloReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
