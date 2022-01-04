import { createSelector } from "@ngrx/store";
import * as fromRouter from '@ngrx/router-store';
import * as fromFeature from '@app/store/reducers';

// router state
export const getMergedRoute = createSelector(fromFeature.getRouterReducerState, (routerReducerState: fromRouter.RouterReducerState<fromFeature.RouterStateUrl>) => routerReducerState.state);

export const getRouterURL = createSelector(getMergedRoute, (state: fromFeature.RouterStateUrl) => state.url);
export const getRouterParams = createSelector(getMergedRoute, (state: fromFeature.RouterStateUrl) => state.params);
export const getRouterQueryParams = createSelector(getMergedRoute, (state: fromFeature.RouterStateUrl) => state.queryParams);
export const getRouterFragment = createSelector(getMergedRoute, (state: fromFeature.RouterStateUrl) => state.fragment);