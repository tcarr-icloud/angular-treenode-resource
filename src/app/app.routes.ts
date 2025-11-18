import {Routes} from '@angular/router';
import {TreeNodes} from './tree-nodes/tree-nodes';
import {authenticatedGuard} from './authenticated-guard';
import {Home} from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tree', component: TreeNodes, canActivate: [authenticatedGuard] }
];
