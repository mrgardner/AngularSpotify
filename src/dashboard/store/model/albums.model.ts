export interface AlbumState {
  albums: AlbumInfo[];
  loading: boolean;
  loaded: boolean;
  error: any;
  next: string;
  total: number;
  canLoadMore: boolean;
  type: string;
}

export interface AlbumInfo {
  name: string;
  id: string;
  image: string;
}

export interface AlbumsPayload {
  albums: AlbumInfo[];
  next: string;
  total: number;
  canLoadMore: boolean;
}

export interface AlbumsErrorPayload {
  code: number;
  message: string;
}