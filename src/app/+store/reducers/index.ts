import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';

import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterState } from '../router-state-serializer';

import { storeFreeze } from 'ngrx-store-freeze';

export interface State {
  readonly router: RouterReducerState<RouterState>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = [storeFreeze];
