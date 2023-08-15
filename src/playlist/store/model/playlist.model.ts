import { SortedTrack } from '@app/interfaces/track/track.interface';

export interface PlaylistState {
  followers: number;
  id: string;
  image: string;
  name: string;
  owner: string;
  public: boolean,
  tracks: SortedTrack[],
  pageSize: number;
  tracksLength: number;
  loading: boolean,
  loaded: boolean,
  error: PlaylistErrorPayload | null
}

export interface PlaylistPayload {
  followers: number;
  id: string;
  image: string;
  name: string;
  owner: string;
  public: boolean
}

export interface LoadPlaylistTracksPayload {
  playlistId: string;
  offset: number;
  limit: number;
}

export interface LoadedTracksPayload {
  tracks: SortedTrack[];
  pageSize: number;
  tracksLength: number;
}

export interface PlaylistErrorPayload {
  code: number;
  message: string;
}