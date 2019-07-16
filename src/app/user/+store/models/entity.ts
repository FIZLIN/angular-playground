import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { getUserEntity, getUserEntityLoaderVisible, } from '../selectors';
import { State } from '../../../+store/reducers';
import { Save, Load, Clear, ActionTypes } from '../actions/entity';
import { Actions, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { IUser } from 'src/app/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class EntityModel {

  user$: Observable<IUser>;
  loaderVisible$: Observable<boolean>;

  saveSuccess$: Observable<boolean>;

  constructor(public store: Store<State>, public actions$: Actions) {
    this.user$ = this.store.select(getUserEntity);
    this.loaderVisible$ = this.store.select(getUserEntityLoaderVisible);

    this.saveSuccess$ = this.actions$.pipe(ofType(ActionTypes.SAVE_SUCCESS), mapTo(true));
  }

  save(user: IUser) {
    this.store.dispatch(new Save({ user }));
  }

  load(id: number) {
    this.store.dispatch(new Load({ id }));
  }

  clear() {
    this.store.dispatch(new Clear());
  }
}
