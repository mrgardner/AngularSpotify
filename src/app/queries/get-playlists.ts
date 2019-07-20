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
