export interface ArtistsState {
  artists: ArtistInfo[];
  loading: boolean;
  loaded: boolean;
  next: string;
  error: any;
  canLoadMore: boolean;
  total: number;
  type: string;
}

export interface ArtistInfo {
  name: string;
  id: string;
  image: string;
}

export interface ArtistsPayload {
  next: string;
  artists: ArtistInfo[];
  total: number;
  canLoadMore: boolean;
}

export interface ArtistsErrorPayload {
  code: number;
  message: string;
}