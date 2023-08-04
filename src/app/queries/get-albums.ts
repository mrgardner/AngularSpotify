import { gql } from 'apollo-angular';

export const ALBUM_INFO = gql`
 query Albums($offset: Int!) {
    albums(offset: $offset) {
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
      total,
      next
    }
  }
`;
