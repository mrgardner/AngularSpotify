export interface AlbumApolloResponse {
  data: {
    albums: ApolloAlbumResult;
  };
  loading: boolean;
  networkStatus: number;
}

export interface DisplayNameApolloResponse {
  data: {}
  loading: boolean;
  networkStatus: number;
}

export interface ApolloAlbumResult {
  items: [AlbumApollo];
  total: number;
  next: string;
}

export interface AlbumApollo {
  artists: [Artist];
  images: [Image];
  name: string;
}

interface Artist {
  name: string;
}

interface Image {
  url: string;
}
