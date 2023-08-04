import { Playlist } from "@app/interfaces/playlist/playlist.interface";

export interface PlaylistsState {
  playlists: Playlist[],
  loading: boolean,
  loaded: boolean,
  next: string,
  error: any,
  selectedPlaylist: Playlist | {};
  canLoadMore: boolean,
  total: number;
}

export interface PlaylistsPayload {
  next: string,
  playlists: Playlist[],
  total: number,
  canLoadMore: boolean
}