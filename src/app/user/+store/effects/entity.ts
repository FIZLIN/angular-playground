import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import {
  ActionTypes,
  Load, LoadSuccess,
  Save, SaveSuccess, SaveFailed,
} from '../actions/entity';
import { IAction } from '../../../shared/interfaces';
import { UpdateEntity } from '../actions/list';
import { UserService } from '../../user.service';

@Injectable()
export class EntityEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  load: Observable<IAction> = createEffect(() => this.actions$.pipe(
    ofType<Load>(ActionTypes.LOAD),
    map(action => action.payload),
    switchMap(({ id }) => this.userService.getOne(id).pipe(
      switchMap(user => [
        new LoadSuccess({ user })
      ]),
      catchError(() => [])
    )),
  ));

  save: Observable<IAction> = createEffect(() => this.actions$.pipe(
    ofType<Save>(ActionTypes.SAVE),
    map(action => action.payload),
    switchMap(({ user: queryUser }) => this.userService.save(queryUser).pipe(
      switchMap(user => [
        new SaveSuccess({ user }),
        new UpdateEntity({ user })
      ]),
      catchError(() => [new SaveFailed()])
    ))
  ));
}
