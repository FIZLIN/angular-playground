import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateSnapshot, Params } from '@angular/router';

export interface RouterState {
  url: string;
  path: string;
  queryParams: Params;
  hierarchyRouteParams: Params[];
  hierarchyData: { [key: string]: any }[];
}

export class AppRouterStateSerializer implements RouterStateSerializer<RouterState> {

  serialize(routerState: RouterStateSnapshot): RouterState {
    const { url } = routerState;
    const path = url.split('?')[0];
    const queryParams = routerState.root.queryParams;
    let hierarchyData = [];
    let hierarchyRouteParams = [];
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
      hierarchyRouteParams = [route.params, ...hierarchyRouteParams];
      hierarchyData = [route.data, ...hierarchyData];
    }

    return {
      url,
      path,
      queryParams,
      hierarchyData,
      hierarchyRouteParams
    };
  }
}
