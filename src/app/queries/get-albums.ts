import { gql } from 'apollo-angular';

export const ALBUM_INFO = gql`
 query Albums($morePlaylists: String) {
    albums(morePlaylists: $morePlaylists) {
      items {
        album {
          artists {
            name
          }
          images {
            url
          }
          name
        }
      }
      total
    }
  }
`;
