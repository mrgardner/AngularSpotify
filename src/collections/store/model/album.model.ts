import { AlbumApollo } from "@app/interfaces/apollo/apollo.inerface";

export interface AlbumState {
  albums: AlbumApollo[];
  loading: boolean;
  loaded: boolean;
  error: any;
  moreAlbums: {
    next: string;
    total: number;
    canLoadMore: boolean;
  }
}

export interface AlbumPayload {
  albums: AlbumApollo[];
  moreAlbums: MoreAlbums;
}

export interface MoreAlbums {
  next: string;
  total: number;
  canLoadMore: boolean;
}

export interface AlbumErrorPayload {
  code: number;
  message: string;
}