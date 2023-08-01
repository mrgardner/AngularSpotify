import { Playlist } from '@app/interfaces/playlist/playlist.interface';

export interface PlaylistsState {
  data: Playlist | null,
  loading: boolean,
  loaded: boolean,
  error: boolean
};