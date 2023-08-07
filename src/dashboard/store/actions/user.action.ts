import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserState } from '../model/user.model';
import { USER_TYPES } from './actions.constant';

export const UserApiActions = createActionGroup({
  source: 'User API',
  events: {
    [USER_TYPES.LOAD_USER]: emptyProps(),
    [USER_TYPES.LOAD_USER_FAIL]: props<{ payload: UserState }>(),
    [USER_TYPES.LOAD_USER_SUCCESS]: props<{ payload: string }>()
  }
});