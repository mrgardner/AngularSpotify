import { gql } from 'apollo-angular';

export const PLAYLIST_NAME = gql`
 query Playlists($offset: Int!) {
    playlists(offset: $offset) {
      total
      items {
        name
        id
        images {
          url
        }
        owner {
          display_name
          id
        }
        type
      }
      next
    }
  }
`;

export const PLAYLIST_INFO = gql`
 query Playlist($playlistID: String!) {
    playlist(playlistID: $playlistID) {
      id
    name
    public
    followers {
      total
    }
    owner {
      display_name
    }
    images {
      url
    }
    tracks {
      total
      next
      limit
      items {
        added_at
        is_local
        track {
          duration_ms
          name
          uri
          album {
            name
           
          }
        }
      }
    }
    }
  }
`;

export const PLAYLIST_TRACKS = gql`
  query PlaylistTracks($offset: Int, $playlistID: String!, $limit: Int) {
    playlistTracks(offset: $offset, playlistID: $playlistID, limit: $limit) {
      total
      limit
      items {
        added_at
        is_local
        track {
          album {
            name
            images {
              url
            }
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