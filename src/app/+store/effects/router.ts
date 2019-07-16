import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTypes, Go, Back, Forward, GoByUrl } from '../actions/router';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType<Go>(ActionTypes.GO_BY_URL),
    map(action => action.payload),
    tap(({ path, extras }) => {
      this.router.navigate(path, extras);
    })
  ), { dispatch: false });

  navigateByUrl$ = createEffect(() => this.actions$.pipe(
    ofType<GoByUrl>(ActionTypes.GO_BY_URL),
    map(action => action.payload),
    tap(({ url, extras }) => {
      this.router.navigateByUrl(url, extras);
    })
  ), { dispatch: false });

  navigateBack$ = createEffect(() => this.actions$.pipe(
    ofType<Back>(ActionTypes.BACK),
    tap(() => this.location.back())
  ), { dispatch: false });

  navigateForward$ = createEffect(() => this.actions$.pipe(
    ofType<Forward>(ActionTypes.FORWARD),
    tap(() => this.location.forward())
  ), { dispatch: false });

  constructor(private actions$: Actions, private router: Router, private location: Location) { }
}
