import { gql } from 'apollo-angular';

export const PLAYLIST_NAME = gql`
 query Playlists($morePlaylists: String) {
    playlists(morePlaylists: $morePlaylists) {
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
 query Playlist($playlistID: String!) {
    playlist(playlistID: $playlistID) {
      name
      id
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
  query PlaylistTracks($trackOffset: Int!, $playlistID: String!, $limit: Int!) {
    playlistTracks(trackOffset: $trackOffset, playlistID: $playlistID, limit: $limit) {
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
