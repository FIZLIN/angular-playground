import { Route, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListResolver } from './guards/list.resolver';
import { EntityResolver } from './guards/entity.resolver';


const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'list',
    component: ListComponent,
    resolve: [ListResolver],
    data: {
      dialogComponentReuse: true
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'add',
    component: ListComponent,
    resolve: [ListResolver, EntityResolver],
    data: {
      dialogId: 'user-entity-add',
      dialogComponentReuse: true
    },

  },
  {
    path: 'edit/:id',
    component: ListComponent,
    resolve: [ListResolver, EntityResolver],
    data: {
      dialogId: 'user-entity-edit',
      dialogComponentReuse: true
    }
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);
