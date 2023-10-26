
import { albumsReducer } from '@dashboard/store/reducers/albums.reducer';
import { artistsReducer } from '@dashboard/store/reducers/artists.reducer';
import { playlistsReducer } from '@dashboard/store/reducers/playlists.reducer';
import { podcastsReducer } from '@dashboard/store/reducers/podcasts.reducer';
import { userReducer } from '@dashboard/store/reducers/user.reducer';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { playlistReducer } from '@playlist/store/reducers/playlist.reducer';
import { AppState } from '../model';
import { authReducer } from './auth.reducer';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
  playlists: playlistsReducer,
  user: userReducer,
  playlist: playlistReducer,
  albums: albumsReducer,
  artists: artistsReducer,
  podcasts: podcastsReducer
};