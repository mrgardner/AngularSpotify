import { Playlist } from "@app/interfaces/playlist/playlist.interface";

export interface PlaylistsState {
  entities: { [id: number]: Playlist },
  loading: boolean,
  loaded: boolean,
  nextPlaylist: string,
  error: boolean,
  selectedPlaylist: string;
  canLoadMore: boolean
}