import { SortedTrack } from '@app/interfaces/track/track.interface';

export interface PlaylistTracksState {
  data: SortedTrack[],
  loading: boolean,
  loaded: boolean,
  error: PlaylistErrorPayload | null
}

export interface LoadPlaylistTracksPayload {
  playlistId: string;
  offset: number;
  limit: number;
}

export interface PlaylistErrorPayload {
  code: number;
  message: string;
}