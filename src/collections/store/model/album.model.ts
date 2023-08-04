import { AlbumApollo } from "@app/interfaces/apollo/apollo.inerface";

export interface AlbumState {
  albums: AlbumApollo[],
  loading: boolean,
  loaded: boolean,
  next: string;
  total: number;
  canLoadMore: boolean;
  error: any;
};

export interface AlbumPayload {
  albums: AlbumApollo[],
  next: string;
  total: number;
  canLoadMore: boolean;
}

export interface AlbumErrorPayload {
  code: number;
  message: string;
}