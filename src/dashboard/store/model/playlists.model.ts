import { PlaylistInfo } from "@app/interfaces/playlist/playlist.interface";

export interface PlaylistsState {
  playlists: PlaylistInfo[];
  loading: boolean;
  loaded: boolean;
  next: string;
  error: any;
  selectedPlaylist: SelectedPlaylist;
  canLoadMore: boolean;
  total: number;
}

export interface PlaylistsPayload {
  next: string;
  playlists: PlaylistInfo[];
  total: number;
  canLoadMore: boolean;
}

export interface SelectedPlaylist {
  id: string;
  name: string;
}