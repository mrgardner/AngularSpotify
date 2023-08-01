import { createActionGroup, props } from '@ngrx/store';
import { PLAYLIST_TYPES } from '@playlist/store/actions/actions.constant';
import { PlaylistsState } from '../model/playlist.model';


export const PlaylistApiActions = createActionGroup({
  source: 'Playlist API',
  events: {
    [PLAYLIST_TYPES.LOAD_PLAYLIST]: props<{ playlist: PlaylistsState }>(),
    [PLAYLIST_TYPES.LOAD_PLAYLIST_FAIL]: props<{ playlist: PlaylistsState }>(),
    [PLAYLIST_TYPES.LOAD_PLAYLIST_SUCCESS]: props<{ playlist: PlaylistsState }>()
  }
});