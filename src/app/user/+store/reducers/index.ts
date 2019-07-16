import { ActionReducerMap } from '@ngrx/store';
import { State as EntityState, reducer as entityReducer } from './entity';
import { State as ListState, reducer as listReducer } from './list';
import { State as RootState } from '../../../+store/reducers';

export interface UserState {
  readonly entity: EntityState;
  readonly list: ListState;
}

export interface State extends RootState {
  user: UserState;
}

export const reducers: ActionReducerMap<UserState> = {
  entity: entityReducer,
  list: listReducer
};
