import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../model/auth.model";

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const selectLoggedIn = createSelector(getAuthState, (state: AuthState) => state.loggedIn);
export const selectAuthToken = createSelector(getAuthState, (state: AuthState) => state.authToken);
export const selectExpiredDate = createSelector(getAuthState, (state: AuthState) => state.expiredDate);
export const selectAuthError = createSelector(getAuthState, (state: AuthState) => state.error);