import { RouterState } from '../router-state-serializer';

export const getUrl = (routerState: RouterState) => routerState.url;
export const getQueryParams = (routerState: RouterState) => routerState.queryParams;
export const getHierarchyRouteParams = (routerState: RouterState) => routerState.hierarchyRouteParams;
export const getPath = (routerState: RouterState) => routerState.path;
export const getHierarchyData = (routerState: RouterState) => routerState.hierarchyData;
