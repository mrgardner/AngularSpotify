import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PLAYLISTS_TYPES } from '@dashboard/store/actions/actions.constant';
import { PlaylistsPayload, PlaylistsState } from '@dashboard/store/model/playlists.model';
import { Playlist } from '@app/interfaces/playlist/playlist.interface';


export const PlaylistsApiActions = createActionGroup({
  source: 'Playlists API',
  events: {
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS]: emptyProps(),
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS_FAIL]: props<{ payload: PlaylistsState }>(),
    [PLAYLISTS_TYPES.LOAD_PLAYLISTS_SUCCESS]: props<{ payload: PlaylistsPayload }>(),
    [PLAYLISTS_TYPES.UPDATE_SELECTED_PLAYLIST]: props<{ payload: Playlist }>()
  }
});