export interface PodcastsState {
  podcasts: PodcastInfo[];
  loading: boolean;
  loaded: boolean;
  next: string;
  error: any;
  canLoadMore: boolean;
  total: number;
  type: string;
}

export interface PodcastsPayload {
  next: string;
  podcasts: PodcastInfo[];
  total: number;
  canLoadMore: boolean;
}

export interface PodcastInfo {
  name: string;
  id: string;
  image: string;
}

export interface PodcastsErrorPayload {
  code: number;
  message: string;
}