import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../model/auth.model";

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getLoggedIn = createSelector(getAuthState, (state: AuthState) => state.loggedIn);
export const getAuthToken = createSelector(getAuthState, (state: AuthState) => state.authToken);
export const getExpiredDate = createSelector(getAuthState, (state: AuthState) => state.expiredDate);
export const getAuthError = createSelector(getAuthState, (state: AuthState) => state.error);