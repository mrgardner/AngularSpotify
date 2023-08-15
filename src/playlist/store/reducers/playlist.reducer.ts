import { createReducer, on } from '@ngrx/store';
import { PlaylistApiActions } from '../actions/playlist.action';
import { PlaylistState } from '../model/playlist.model';

export const initialState: Readonly<PlaylistState> = {
  followers: 0,
  id: '',
  image: '',
  name: '',
  owner: '',
  public: false,
  tracks: [],
  pageSize: 0,
  tracksLength: 0,
  loading: false,
  loaded: false,
  error: null
};

// TODO: Restructure
export const playlistReducer = createReducer(
  initialState,
  on(PlaylistApiActions.loadPlaylist, state => ({
    ...state,
    loading: true
  })),
  on(PlaylistApiActions.loadPlaylistSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    followers: payload.followers,
    id: payload.id,
    image: payload.image,
    name: payload.name,
    owner: payload.owner,
    public: payload.public
  })),
  on(PlaylistApiActions.loadPlaylistFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  })),
  on(PlaylistApiActions.loadPlaylistTracks, state => ({
    ...state,
    loading: true
  })),
  on(PlaylistApiActions.loadPlaylistTracksSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    tracks: payload.tracks,
    tracksLength: payload.tracksLength,
    pageSize: payload.pageSize
  })),
  on(PlaylistApiActions.loadPlaylistTracksFail, (state, { payload }) => ({
    ...state,
    error: payload,
    loaded: false,
    loading: false
  }))
);