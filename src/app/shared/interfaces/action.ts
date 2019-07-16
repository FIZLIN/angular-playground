import { Action } from '@ngrx/store';

export interface IAction extends Action {
  readonly type: string;
  readonly payload: {} | null;
}
