import { createSelector } from "@ngrx/store";
import { UserState } from "../model/user.model";
import { DashboardState } from "../model";
import { getDashboardState } from ".";

// user state
export const getUserState: any = createSelector(getDashboardState, (state: DashboardState) => state.user);

export const getUserDisplayName = createSelector(getUserState, (state: UserState) => state.displayName)
export const getUserError = createSelector(getUserState, (state: UserState) => state.error);