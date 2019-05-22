import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiModule } from './api/api.module';

import { DetailModule } from './detail/detail.module' //lazy loaded modules comes before routing module
import { TodosRoutingModule } from './todos-routing.module';
import { ListComponent } from './list/list.component';
import { TableModule } from 'ng-kloten';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [ListComponent, CellComponent],
  entryComponents: [CellComponent],
  imports: [
    ApiModule,
    CommonModule,
    TodosRoutingModule,
    TableModule
  ]
})
export class TodosModule { }
