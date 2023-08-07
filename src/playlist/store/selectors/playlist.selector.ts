import { PlaylistsState } from "../model/playlist.model";

// TODO: FIX SELECTORS
export const getPlaylistsError = (state: PlaylistsState) => state.error;
export const getPlaylistsEntities = (state: PlaylistsState) => state.data;
export const getPlaylistsLoading = (state: PlaylistsState) => state.loading;
export const getPlaylistsLoaded = (state: PlaylistsState) => state.loaded;