import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "../model/user.model";

// user state
export const getUserState = createFeatureSelector<UserState>(
  'user'
);

export const getUserDisplayName = createSelector(getUserState, (state: UserState) => state.displayName)
export const getUserError = createSelector(getUserState, (state: UserState) => state.error);