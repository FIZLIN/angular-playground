import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState } from '../reducers';

import * as entity from './entity';
import * as list from './list';

import { createEntityAdapter } from '@ngrx/entity';
import { IUser } from '../../../shared/interfaces';

export const getUserState = createFeatureSelector<UserState>('user');
export const getUserEntityState = createSelector(getUserState, s => s.entity);
export const getUserListState = createSelector(getUserState, s => s.list);

export const adapter = createEntityAdapter<IUser>();

/* Controller List Selectors */
export const {
  selectAll: getAllUsers,
  selectEntities: getUserEntities,
  selectIds: getAllUserIds,
  selectTotal: getUserCount
} = adapter.getSelectors(getUserListState);

export const getUserListIsLoaded = createSelector(getUserListState, list.getIsLoaded);

/* Controller Entity Selectors */
export const getUserEntity = createSelector(getUserEntityState, entity.getEntity);
export const getUserEntityLoaderVisible = createSelector(getUserEntityState, entity.getLoaderVisible);




