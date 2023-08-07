export interface AlbumApolloResponse {
  data: any;
  loading: boolean;
  networkStatus: number;
}

export interface DisplayNameApolloResponse {
  data: any;
  loading: boolean;
  networkStatus: number;
}

export interface ApolloAlbumResult {
  items: AlbumApollo[];
  total: number;
  next: string;
}

export interface AlbumApollo {
  album: {
    artists: Artist[];
    images: Image[];
    name: string;
  }
}

interface Artist {
  name: string;
  external_urls: string;
  id: string
  type: string;
  uri: string;
  images: Image[]
}

interface Image {
  url: string;
  height: number;
  width: number;
}