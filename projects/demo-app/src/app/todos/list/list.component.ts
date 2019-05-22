import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { ApiService } from './../api/api.service';
import { CellComponent } from '../cell/cell.component';
//
// import { TableHeaderInterface } from 'ng-kloten';

const dateRenderer = (dataRow, columnKey) => {
  return dataRow[columnKey] ? new Date(dataRow[columnKey]).toDateString() : '';
};

@Component({
  selector: 'demo-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  titleCasePipe = new TitleCasePipe();
  data: any;
  headers: any[] = [
    { label: '', id: 'cog' },
    {
      label: 'Title',
      id: 'title',
      type: 'nav',
      navKey: 'id',
      renderer: (dataRow, columnKey) => {
        return `<small class="heart">♥</small> ${this.titleCasePipe.transform(dataRow[columnKey])}`;
      },
      isFilterable: true
    },
    {label: 'Description', id: 'description', cellComponent: CellComponent, isFilterable: true},
    {label: 'Created At', id: 'createdAt', type: 'date'},
    {label: 'Completed At', id: 'completedAt', type: 'date'}
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .getItems()
      .subscribe((res: any) => {
        this.data = res || {};
      });
  }
}
