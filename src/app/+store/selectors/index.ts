import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';

import { RouterState } from '../router-state-serializer';

import * as router from './router';
import { RouterReducerState } from '@ngrx/router-store';

/* Feature Store Selectors */
export const getRouterReducerState = createFeatureSelector<RouterReducerState<RouterState>>('router');

/* Router State Selectors */
export const getRouterState = createSelector(getRouterReducerState, state => state ? state.state : {});
export const getRouterUrl = createSelector(getRouterState, router.getUrl);
export const getRouterQueryParams = createSelector(getRouterState, router.getQueryParams);
export const getRouterHierarchyRouteParams = createSelector(getRouterState, router.getHierarchyRouteParams);
export const getRoutePath = createSelector(getRouterState, router.getPath);
export const getRouteHierarchyData = createSelector(getRouterState, router.getHierarchyData);
