
import { ActionReducerMap } from '@ngrx/store';
import { CollectionsState } from '../model';
import { albumReducer } from './album.reducer';

export const reducers: ActionReducerMap<CollectionsState> = {
  albums: albumReducer
};