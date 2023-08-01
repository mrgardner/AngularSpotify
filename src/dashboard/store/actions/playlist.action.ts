import { createActionGroup, props } from '@ngrx/store';
import { PLAYLISTS_TYPES } from '@dashboard/store/actions/actions.constant';
import { PlaylistsState } from '@dashboard/store/model/playlists.model';


export const PlaylistsApiActions = createActionGroup({
  source: 'User API',
  events: {
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS]: props<{ payload: PlaylistsState }>(),
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS_FAIL]: props<{ payload: PlaylistsState }>(),
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS_SUCCESS]: props<{ payload: PlaylistsState }>(),
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS_BY_URL]: props<{ payload: PlaylistsState }>(),
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS_BY_URL_FAIL]: props<{ payload: PlaylistsState }>(),
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS_BY_URL_SUCCESS]: props<{ payload: PlaylistsState }>(),
    [PLAYLISTS_TYPES.UPDATE_SELECTED_PLAYLIST]: props<{ payload: PlaylistsState }>()
  }
});