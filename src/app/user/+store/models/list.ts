import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../reducers';
import { IUser } from '../../../shared/interfaces';
import { getAllUsers, getUserListIsLoaded } from '../selectors';
import { LoadUsers, SetIsLoaded } from '../actions/list';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ListModel {
  userList$: Observable<IUser[]>;
  filter$: Observable<string>;
  isLoaded$: Observable<boolean>;

  constructor(private store: Store<State>, ) {
    this.userList$ = this.store.select(getAllUsers);
    this.isLoaded$ = this.store.select(getUserListIsLoaded);
  }

  loadUsers() {
    this.store.dispatch(new LoadUsers());
  }
  setIsLoaded(isLoaded: boolean) {
    this.store.dispatch(new SetIsLoaded({ isLoaded }));
  }

}
