import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { ActionTypes, Actions } from '../actions/list';
import { IUser } from '../../../shared/interfaces';

export interface State extends EntityState<IUser> {
  isLoaded: boolean;
}

type PartialState = Partial<State>;

export const adapter = createEntityAdapter<IUser>({
  selectId: (user: IUser) => user.id
});

export const initialState: State = adapter.getInitialState({
  isLoaded: false
});

const actionMap: { [type: string]: (payload: any, state: State) => PartialState } = {
  [ActionTypes.LOAD_USERS]: () => ({ isLoaded: false }),

  [ActionTypes.LOAD_USERS_SUCCESS]: ({ users }: { users: IUser[] }, state: State) => {
    return {
      ...adapter.addAll(users, state),
      isLoaded: true
    };
  },

  [ActionTypes.UPDATE_ENTITY]: ({ user }: { user: IUser }, state: State) => {
    return { ...adapter.upsertOne(user, state) };
  },

  [ActionTypes.SET_IS_LOADED]: ({ isLoaded }: { isLoaded: boolean }) => {
    return { isLoaded };
  }
};

export function reducer(state: State = initialState, action: Actions): State {
  const mapAction = actionMap[action.type];
  return mapAction ? (Object.assign({}, state, mapAction(action.payload || null, state)) as State) : state;
}
