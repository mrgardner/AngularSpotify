import { gql } from 'apollo-angular';

export const USER_DISPLAY_NAME = gql`
  query User($url: String!) {
    user(url: $url) {
      display_name
    }
  }
`;
