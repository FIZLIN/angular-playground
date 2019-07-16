import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EntityModel } from '../+store/models/entity';
import { Observable, of } from 'rxjs';
import { first, tap, mapTo } from 'rxjs/operators';
import { RouterModel } from 'src/app/+store/models/router';

@Injectable({ providedIn: 'root' })
export class EntityResolver implements Resolve<Observable<boolean>> {

  constructor(
    private entityModel: EntityModel,
    private routerModel: RouterModel
  ) { }


  resolve(route: ActivatedRouteSnapshot) {
    let id = +route.params.id;
    if (isNaN(id) && !!route.params.id) {
      return of(false).pipe(
        tap(() => this.routerModel.navigate(['/user/list']))
      );
    }
    id = id || 0;

    this.entityModel.load(id);
    return this.entityModel.user$.pipe(first(user => !!user), mapTo(true));
  }
}
