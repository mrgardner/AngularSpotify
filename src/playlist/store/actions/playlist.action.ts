import { Action } from '@ngrx/store';
import { PLAYLIST_TYPES } from '@playlist/constants/actions.constant';

export class LoadPlaylist implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLIST;
}

export class LoadPlaylistFail implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLIST_FAIL;
  constructor(public payload: any) { }
}

export class LoadPlaylistSuccess implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLIST_SUCCESS;
  constructor(public payload: any) { }
}

// action types
export type PlaylistAction = LoadPlaylist | LoadPlaylistFail | LoadPlaylistSuccess;