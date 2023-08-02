import { gql } from 'apollo-angular';

export const USER_DISPLAY_NAME = gql`
  query user {
    user {
      display_name
    }
  }
`;
