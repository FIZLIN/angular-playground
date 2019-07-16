import { Injectable, OnDestroy } from '@angular/core';
import { Params, NavigationExtras, Router, NavigationStart, GuardsCheckEnd, NavigationEnd, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subject } from 'rxjs';

import { State } from '../reducers';
import {
  getRouterUrl,
  getRouterQueryParams,
  getRouterHierarchyRouteParams,
  getRoutePath,
  getRouteHierarchyData
} from '../selectors';
import { Go, Back, Forward, GoByUrl } from '../actions/router';
import { merge } from 'rxjs';
import {
  filter,
  map,
  withLatestFrom,
  bufferCount,
  startWith,
  takeUntil,
  mapTo,
  pairwise,
  switchMap,
  first,
  distinctUntilChanged
} from 'rxjs/operators';
import { comparer } from '../../shared/util';

@Injectable({ providedIn: 'root' })
export class RouterModel implements OnDestroy {

  private isAlive: Subject<void> = new Subject<void>();

  url$: Observable<string>;
  path$: Observable<string>;
  queryParams$: Observable<Params>;
  hierarchyRouteParams$: Observable<Params[]>;
  hierarchyData$: Observable<{ [key: string]: any }[]>;

  get currentRouteData$() {
    return this.hierarchyData$.pipe(map(d => d && d[0] || {}));
  }

  get currentRouteParams$() {
    return this.hierarchyRouteParams$.pipe(map(rps => rps && rps[0] || {}));
  }

  get allRouteParams$() {
    return this.hierarchyRouteParams$.pipe(map(rps => (rps || []).reduce((acc, curr) => ({ ...acc, ...curr }), {})));
  }

  previousRoute$: ReplaySubject<{
    path: string,
    queryParams: { [key: string]: string },
    hierarchyRouteParams: { [key: string]: string }[],
    hierarchyData: { [key: string]: string }[]
  }> = new ReplaySubject(1);

  guardedAllRouteParams$: Observable<Params>;
  guardedHierarchyData$: Observable<{ [key: string]: any }[]>;
  guardedUrl$: Observable<string>;

  previousRoutePath$: Observable<string>;
  previousRouteQueryParams$: Observable<{ [key: string]: string }>;

  queryParamsStore: Observable<any>;

  constructor(
    private store: Store<State>,
    router: Router
  ) {


    const navigationStart$ = router.events.pipe(filter(event => event instanceof NavigationStart));
    const guardsCheckEnd$ = router.events.pipe(filter(event => event instanceof GuardsCheckEnd));
    const navigationEnd$ = router.events.pipe(filter(event => event instanceof NavigationEnd));

    const isActivatingAndWaitingForGuards$ = merge(
      navigationStart$.pipe(mapTo(true)),
      guardsCheckEnd$.pipe(mapTo(false))
    ).pipe(startWith(false));

    this.url$ = store.select(getRouterUrl).pipe(filter(val => val !== undefined && val !== null));
    this.path$ = store.select(getRoutePath).pipe(map(decodeURIComponent));
    this.queryParams$ = store.select(getRouterQueryParams);
    this.hierarchyRouteParams$ = store.select(getRouterHierarchyRouteParams);
    this.hierarchyData$ = store.select(getRouteHierarchyData);

    this.guardedAllRouteParams$ = this.allRouteParams$.pipe(
      filter(val => !!val),
      startWith(null),
      pairwise(),
      withLatestFrom(isActivatingAndWaitingForGuards$),
      switchMap(([[prevRouteParams, currRouteParams], isTransitioning]) => {
        if (isTransitioning) {
          return navigationEnd$.pipe(first(), mapTo(currRouteParams), startWith(prevRouteParams));
        }
        return [currRouteParams];
      }),
      distinctUntilChanged((prevValue, currValue) => comparer(prevValue, currValue))
    );

    this.guardedHierarchyData$ = this.hierarchyData$.pipe(
      filter(val => !!val),
      startWith(null),
      pairwise(),
      withLatestFrom(isActivatingAndWaitingForGuards$),
      switchMap(([[prevRouteData, currRouteData], isTransitioning]) => {
        if (isTransitioning) {
          return navigationEnd$.pipe(first(), mapTo(currRouteData), startWith(prevRouteData));
        }
        return [currRouteData];
      }),
      distinctUntilChanged((prevValue, currValue) => comparer(prevValue, currValue))
    );

    this.guardedUrl$ = this.url$.pipe(
      filter(val => !!val),
      startWith(null),
      pairwise(),
      withLatestFrom(isActivatingAndWaitingForGuards$),
      switchMap(([[prevUrl, currUrl], isTransitioning]) => {
        if (isTransitioning) {
          return navigationEnd$.pipe(first(), mapTo(currUrl), startWith(prevUrl));
        }
        return [currUrl];
      }),
      distinctUntilChanged((prevValue, currValue) => comparer(prevValue, currValue))
    );

    const previousDataSource$ = this.url$.pipe(
      withLatestFrom(this.path$, this.queryParams$, this.hierarchyRouteParams$, this.hierarchyData$),
      bufferCount(2, 1),
      map(routeData => {
        const [, path = null, queryParams = null, routeParams = null, data = null] = routeData[0];
        return { path, queryParams, routeParams, data };
      }),
      startWith({} as any)
    );

    previousDataSource$.pipe(
      takeUntil(this.isAlive)
    ).subscribe(data => this.previousRoute$.next(data));

    this.previousRouteQueryParams$ = this.previousRoute$.pipe(map(route => route.queryParams));
    this.previousRoutePath$ = this.previousRoute$.pipe(map(route => route.path));
  }

  navigate(path: any[], extras?: NavigationExtras) {
    this.store.dispatch(new Go({ path, extras }));
  }
  navigateByUrl(url: UrlTree, extras?: NavigationExtras) {
    this.store.dispatch(new GoByUrl({ url, extras }));
  }

  back() {
    this.store.dispatch(new Back());
  }

  forward() {
    this.store.dispatch(new Forward());
  }

  ngOnDestroy() {
    this.isAlive.next(); this.isAlive.complete();
  }
}
