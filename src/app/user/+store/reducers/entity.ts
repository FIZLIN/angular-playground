
import { ActionTypes, Actions } from '../actions/entity';
import { IUser } from '../../../shared/interfaces';

export interface State {
  readonly entity: IUser | null;
  readonly loaderVisible: boolean | null;
}

type PartialState = Partial<State>;

const initialState: State = {
  entity: null,
  loaderVisible: null
};

const actionMap: { [type: string]: (payload: any, state: State) => PartialState } = {
  [ActionTypes.LOAD_SUCCESS]: ({ user: entity }: { user: IUser }) => {
    return { entity };
  },

  [ActionTypes.SAVE]: () => {
    return { loaderVisible: true };
  },
  [ActionTypes.SAVE_SUCCESS]: ({ user: entity }: { user: IUser }) => {
    return { entity, loaderVisible: false };
  },
  [ActionTypes.SAVE_FAILED]: () => {
    return { loaderVisible: false };
  },

  [ActionTypes.CLEAR]: () => {
    return initialState;
  }
};

export function reducer(state: State = initialState, action: Actions): State {
  const mapAction = actionMap[action.type];
  return mapAction ? (Object.assign({}, state, mapAction(action.payload || null, state)) as State) : state;
}
