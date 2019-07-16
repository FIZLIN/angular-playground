import { NavigationExtras, UrlTree } from '@angular/router';
import { IAction } from '../../shared/interfaces';

export const ActionTypes = {
  GO: '[ROUTER] Go',
  GO_BY_URL: '[ROUTER] Go By Url',
  BACK: '[ROUTER] Back',
  FORWARD: '[ROUTER] Forward'
};

export class Go implements IAction {
  readonly type = ActionTypes.GO;
  constructor(public payload: { path: string[]; extras?: NavigationExtras; }) { }
}

export class GoByUrl implements IAction {
  readonly type = ActionTypes.GO_BY_URL;
  constructor(public payload: { url: UrlTree; extras?: NavigationExtras; }) { }
}

export class Back implements IAction {
  readonly type = ActionTypes.BACK;
  constructor(public payload: null = null) { }
}

export class Forward implements IAction {
  readonly type = ActionTypes.FORWARD;
  constructor(public payload: null = null) { }
}

export type Actions = Go | Back | Forward;
