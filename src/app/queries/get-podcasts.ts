import { gql } from 'apollo-angular';

export const PODCASTS = gql`
  query Podcasts($offset: Int!) {
    podcasts(offset: $offset) {
      items {
        show {
          id
          name
          images {
            url
          }
          type
          publisher
          explicit
        }
      }
      total
      next
    }
  }
`;