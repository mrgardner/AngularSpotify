import gql from 'graphql-tag';

export const USER_DISPLAY_NAME = gql`
  {
    User {
      display_name
    }
  }
`;
