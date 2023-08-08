import { createSelector } from "@ngrx/store";
import { getPlaylistState } from ".";
import { PlaylistState } from "../model";
import { PlaylistTracksState } from "../model/playlist.model";

export const getPlaylistTracksState = createSelector(getPlaylistState, (state: PlaylistState) => state.playlistTracks);

export const selectPlaylistError = createSelector(getPlaylistTracksState, (state: PlaylistTracksState) => state.error);
export const selectPlaylist = createSelector(getPlaylistTracksState, (state: PlaylistTracksState) => state.data);
export const selectPlaylistLoading = createSelector(getPlaylistTracksState, (state: PlaylistTracksState) => state.loading);
export const selectPlaylistLoaded = createSelector(getPlaylistTracksState, (state: PlaylistTracksState) => state.loaded);