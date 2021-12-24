import { gql } from 'apollo-angular';

export const ALBUM_INFO = gql`
 query Albums($url: String!) {
    albums(url: $url) {
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
