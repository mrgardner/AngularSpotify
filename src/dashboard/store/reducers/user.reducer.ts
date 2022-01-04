import * as fromUser from '../actions/user.action';

export interface UserState {
  displayName: string;
  error: boolean;
  loading: boolean;
  loaded: Boolean;
};

export const initialState: UserState = {
  displayName: 'The Man',
  error: false,
  loaded: false,
  loading: false
};

export function userReducer(state = initialState, action: fromUser.UserAction): UserState {
  switch (action.type) {
    case fromUser.LOAD_USER: {
      return {
        ...state,
        loading: true
      }
    }
    case fromUser.LOAD_USER_SUCCESS: {
      return {
        ...state,
        error: false,
        displayName: action.payload,
        loaded: true,
        loading: false
      }
    }
    case fromUser.LOAD_USER_FAIL: {
      return {
        ...state,
        error: true,
        loaded: false,
        loading: false
      }
    }
    default: {
      return state;
    }
  }
}