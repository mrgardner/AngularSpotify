import { SPOTIFY_AUTH } from '@app/constants/auth.constant';
import * as fromAuth from '../actions/auth.action';

export interface AuthState {
  loggedIn: boolean;
  error: any;
  authToken: string;
  expiredDate: string;
};

export const initialState: AuthState = {
  loggedIn: false,
  error: null,
  authToken: '',
  expiredDate: ''
};

export function authReducer(state = initialState, action: fromAuth.UserAction): AuthState {
  switch (action.type) {
    case fromAuth.LOGIN: {
      return {
        ...state
      };
    }
    case fromAuth.LOGOUT: {
      sessionStorage.removeItem(SPOTIFY_AUTH.SPOTIFY_TOKEN);
      sessionStorage.removeItem(SPOTIFY_AUTH.EXPIRED_DATE);
      return {
        ...state,
        loggedIn: false
      };
    }
    case fromAuth.STORE_AUTH_TOKEN: {
      const { authToken, expiredDate } = action.payload;
      return {
        ...state,
        loggedIn: true,
        authToken,
        expiredDate,
        error: null
      }
    }
    case fromAuth.REMOVE_AUTH_TOKEN: {
      return {
        ...state,
        authToken: '',
        expiredDate: '',
        error: null
      }
    }
    case fromAuth.AUTH_ERROR: {
      return {
        ...state,
        loggedIn: false,
        error: action.payload
      }
    }
    case fromAuth.AUTH_CHECK: {
      return {
        ...state
      }
    }
    default: {
      return state;
    }
  }
}