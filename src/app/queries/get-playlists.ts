import gql from 'graphql-tag';

export const PLAYLIST_NAME = gql`
 query Playlists($url: String!) {
    playlists(url: $url) {
      total
      items {
        name
        id
      }
      next
    }
  }
`;

export const PLAYLIST_INFO = gql`
 query Playlist($url: String!) {
    playlist(url: $url) {
      name
      owner {
        display_name
      }
      tracks {
        total
      }
      images {
        url
      }
      followers {
        total
      }
    }
  }
`;

export const PLAYLIST_TRACKS = gql`
  query PlaylistTracks($url: String!) {
    playlistTracks(url: $url) {
      total
      limit
      items {
        added_at
        track {
          album {
            name
          }
          artists {
            name
          }
          name
          duration_ms
          uri
        }
      }
    }
  }
`;
