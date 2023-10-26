import { gql } from 'apollo-angular';

export const FOLLOWED_ARTISTS = gql`
  query Artists {
    artists {
      artists {
        items {
          images {
            url
          },
          name
          id
          type
        }
        total
        next
      }
    }
  }
`;