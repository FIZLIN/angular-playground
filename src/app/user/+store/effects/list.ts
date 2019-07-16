import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IAction } from '../../../shared/interfaces';
import {
  ActionTypes,
  LoadUsers,
  LoadUsersSuccess,
} from '../actions/list';

import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../user.service';

@Injectable()
export class ListEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  loadUsers: Observable<IAction> = createEffect(() => this.actions$.pipe(
    ofType<LoadUsers>(ActionTypes.LOAD_USERS),
    map(action => action.payload),
    switchMap(() => this.userService.getAll().pipe(
      map(users => new LoadUsersSuccess({ users })),
      catchError(() => [])
    )),
  ));
}
