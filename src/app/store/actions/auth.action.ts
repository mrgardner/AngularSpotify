import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AUTH_TYPES } from './actions.constant';
import { AuthErrorPayload, AuthPayload } from '../model/auth.model';

export const AuthApiActions = createActionGroup({
  source: 'Auth API',
  events: {
    [AUTH_TYPES.LOGIN]: emptyProps(),
    [AUTH_TYPES.LOGOUT]: emptyProps(),
    [AUTH_TYPES.STORE_AUTH_TOKEN]: props<{ payload: AuthPayload }>(),
    [AUTH_TYPES.REMOVE_AUTH_TOKEN]: emptyProps(),
    [AUTH_TYPES.AUTH_CHECK]: emptyProps(),
    [AUTH_TYPES.AUTH_ERROR]: props<{ payload: AuthErrorPayload }>(),
  }
});