import { createSelector } from "@ngrx/store";
import { getDashboardState } from ".";
import { DashboardState } from "../model";
import { UserState } from "../model/user.model";

// user state
export const getUserState: any = createSelector(getDashboardState, (state: DashboardState) => state.user);

export const getUserDisplayName = createSelector(getUserState, (state: UserState) => state.displayName)
export const getUserError = createSelector(getUserState, (state: UserState) => state.error);