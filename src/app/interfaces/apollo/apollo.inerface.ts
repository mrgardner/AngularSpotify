export interface AlbumApolloResponse {
  data: {
    albums: ApolloAlbumResult;
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export interface UserDisplayNameApolloResponse {
  data: {
    user: ApolloUserDisplayNameResult;
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export interface PlaylistsApolloResponse {
  data: {
    playlists: ApolloPlaylistsResult;
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export interface PlaylistApolloResponse {
  data: {
    playlist: ApolloPlaylistResult;
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export interface PlaylistTracksApolloResponse {
  data: {
    playlistTracks: ApolloPlaylistTracksResult;
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export interface FollowedArtistsApolloResponse {
  data: {
    followedArtists: ApolloFollowedArtistsResult;
  };
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export interface ApolloFollowedArtistsResult {
  artists: {
    items: [ApolloFollowedArtist]
  };
}

export interface ApolloFollowedArtist {
  images: [
    {
      height: number;
      width: number;
      url: string;
    }
  ];
  name: string;
}


export interface ApolloPlaylistTracksResult {
  total: number;
  limit: number;
  items: [
    {
      added_at: string;
      track: {
        album: {
          name: string;
        };
        artists: [
          {
            name: string;
          }
        ];
        name: string;
        duration_ms: number;
        uri: string;
      }
    }
  ];
}

export interface ApolloPlaylistResult {
  name: string;
  id: string;
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
  images: [
    {
      url: string
    }
  ];
  followers: {
    total: number;
  };
}

export interface ApolloPlaylistsResult {
  total: number;
  items: [
    PlaylistNavMenu
  ];
  next: string;
}

export interface PlaylistNavMenu {
  name: string;
    id: string;
    selected: boolean;
    selectedUrl: string;
}

export interface ApolloUserDisplayNameResult {
  display_name: string;
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
