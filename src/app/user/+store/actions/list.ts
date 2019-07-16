import { actionType } from '../../../shared/action-type';
import { IAction, IUser } from '../../../shared/interfaces';

export const ActionTypes = {
  LOAD_USERS: actionType('[USER LIST] Load'),
  LOAD_USERS_SUCCESS: actionType('[USER LIST] Load Success'),
  UPDATE_ENTITY: actionType('[USER LIST] Update Entity'),
  SET_IS_LOADED: actionType('[USER LIST] Set Is Loaded'),
};

export class LoadUsers implements IAction {
  type = ActionTypes.LOAD_USERS;
  constructor(public payload: null = null) { }
}

export class LoadUsersSuccess implements IAction {
  type = ActionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: { users: IUser[] }) { }
}
export class UpdateEntity implements IAction {
  type = ActionTypes.UPDATE_ENTITY;
  constructor(public payload: { user: IUser }) { }
}

export class SetIsLoaded implements IAction {
  type = ActionTypes.SET_IS_LOADED;
  constructor(public payload: { isLoaded: boolean }) { }
}

export type Actions =
  LoadUsers | LoadUsersSuccess |
  UpdateEntity |
  SetIsLoaded;
