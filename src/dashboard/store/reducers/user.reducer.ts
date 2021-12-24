import * as fromUser from '../actions/user.action';

export interface UserState {
  displayName: string,
  error: boolean,
};

export const initialState: UserState = {
  displayName: 'The Man',
  error: false
};

export function userReducer(state = initialState, action: fromUser.UserAction): UserState {
  switch (action.type) {
    case fromUser.LOAD_USER: {
      return {
        ...state
      }
    }
    case fromUser.LOAD_USER_SUCCESS: {
      return {
        ...state,
        error: false,
        displayName: action.payload
      }
    }
    case fromUser.LOAD_USER_FAIL: {
      return {
        ...state,
        error: true
      }
    }
    default: {
      return state;
    }
  }
}

export const getUserError = (state: UserState) => state.error;
export const getUser = (state: UserState) => state.displayName;