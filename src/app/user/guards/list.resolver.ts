import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ListModel } from '../+store/models/list';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ListResolver implements Resolve<Observable<boolean>> {

  constructor(private listModel: ListModel) { }

  resolve() {
    this.listModel.loadUsers();
    return this.listModel.isLoaded$.pipe(first(loaded => !!loaded));
  }
}
