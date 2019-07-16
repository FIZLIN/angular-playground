import { actionType } from '../../../shared/action-type';
import { IAction, IUser } from '../../../shared/interfaces';

export const ActionTypes = {
  LOAD: actionType('[USER ENTITY] Load'),
  LOAD_SUCCESS: actionType('[USER ENTITY] Load Success'),
  SAVE: actionType('[USER ENTITY] Save'),
  SAVE_SUCCESS: actionType('[USER ENTITY] Save Success'),
  SAVE_FAILED: actionType('[USER ENTITY] Save Failed'),
  CLEAR: actionType('[USER ENTITY] Clear User')
};

export class Load implements IAction {
  type = ActionTypes.LOAD;
  constructor(public payload: { id: number }) { }
}

export class LoadSuccess implements IAction {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: { user: IUser }) { }
}
export class Save implements IAction {
  type = ActionTypes.SAVE;
  constructor(public payload: { user: IUser }) { }
}

export class SaveSuccess implements IAction {
  type = ActionTypes.SAVE_SUCCESS;
  constructor(public payload: { user: IUser }) { }
}

export class SaveFailed implements IAction {
  type = ActionTypes.SAVE_FAILED;
  constructor(public payload = null) { }
}

export class Clear implements IAction {
  type = ActionTypes.CLEAR;
  constructor(public payload = null) { }
}

export type Actions =
  Load | LoadSuccess |
  Save | SaveSuccess | SaveFailed |
  Clear;
