import { Playlist } from "@app/interfaces/playlist/playlist.interface";

export interface PlaylistsState {
  entities: { [id: number]: Playlist },
  loading: boolean,
  loaded: boolean,
  nextPlaylist: string,
  error: any,
  selectedPlaylist: Playlist | {};
  canLoadMore: boolean,
  total: number;
}

export interface PlaylistsPayload {
  nextPlaylist: string,
  entities: { [id: number]: Playlist },
  total: number,
  canLoadMore: boolean
}