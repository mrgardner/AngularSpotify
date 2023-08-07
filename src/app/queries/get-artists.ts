import { gql } from 'apollo-angular';

export const FOLLOWED_ARTISTS = gql`
  query FollowedArtists($url: String!) {
    followedArtists(url: $url) {
      artists {
        items {
          images {
            height,
            width,
            url
          },
          name
        }
      }
    }
  }
`;