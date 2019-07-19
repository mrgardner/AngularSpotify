import gql from 'graphql-tag';

export const USER_DISPLAY_NAME = gql`
  {
    user {
      display_name
    }
  }
`;
