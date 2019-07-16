import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
// import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id', loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
