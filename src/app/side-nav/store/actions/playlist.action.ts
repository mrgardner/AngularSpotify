import { Action } from '@ngrx/store';
import { PLAYLIST_TYPES } from '@side-nav/constants/actions.constant';
import { PlaylistsPayload } from '@side-nav/interfaces/actions.interface';

export class LoadPlaylists implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLISTS;
}

export class LoadPlaylistsFail implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLISTS_FAIL;
  constructor(public payload: any) { }
}

export class LoadPlaylistsSuccess implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLISTS_SUCCESS;
  constructor(public payload: PlaylistsPayload) { }
}

export class LoadPlaylistsByURL implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL;
}

export class LoadPlaylistsByURLFail implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL_FAIL;
  constructor(public payload: any) { }
}

export class LoadPlaylistsByURLSuccess implements Action {
  readonly type = PLAYLIST_TYPES.LOAD_PLAYLISTS_BY_URL_SUCCESS;
  constructor(public payload: PlaylistsPayload) { }
}

export class UpdateSelectedPlaylist implements Action {
  readonly type = PLAYLIST_TYPES.UPDATE_SELECTED_PLAYLIST;
  constructor(public payload: string) { }
}

// action types
export type PlaylistAction = LoadPlaylists | LoadPlaylistsFail | LoadPlaylistsSuccess | UpdateSelectedPlaylist | LoadPlaylistsByURL | LoadPlaylistsByURLFail | LoadPlaylistsByURLSuccess;