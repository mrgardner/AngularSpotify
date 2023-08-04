
import { ActionReducerMap } from '@ngrx/store'
import { albumReducer } from './album.reducer';
import { CollectionsState } from '../model';

export const reducers: ActionReducerMap<CollectionsState> = {
  albums: albumReducer
};