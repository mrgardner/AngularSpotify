export interface AlbumApolloResponse {
  data: {
    albums: ApolloAlbumResult;
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;
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
