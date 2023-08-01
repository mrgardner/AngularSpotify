import { createSelector } from "@ngrx/store";
import { RouterStateUrl, getRouterReducerState } from "../reducers";
import { RouterReducerState } from "@ngrx/router-store";

// export const selectRouterState = createFeatureSelector()

// router state
// TODO: FIX SELECTORS
export const getMergedRoute = createSelector(getRouterReducerState, (routerReducerState: RouterReducerState<RouterStateUrl>) => routerReducerState.state);

export const getRouterURL = (state: RouterStateUrl) => state.url;
export const getRouterParams = (state: RouterStateUrl) => state.params;
export const getRouterQueryParams = (state: RouterStateUrl) => state.queryParams;
export const getRouterFragment = (state: RouterStateUrl) => state.fragment;

export const selectVisibleBooks = createSelector(
  getRouterFragment
);