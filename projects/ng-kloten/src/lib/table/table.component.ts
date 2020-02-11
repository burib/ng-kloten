// app.component.ts

import { FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, Input, Injector } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ngkl-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  filters = [];
  filterValues = {};

  @Input() data: any[] = [];
  @Input() headers: any[] = [];
  dataSource: any;
  displayedColumns: string[];
  getInjector: any;

  pageSize = 10;
  pageSizeOptions = [10, 25, 50, 100];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private injector: Injector) {
    this.getInjector = (row, cell, cellKey) => {
      return Injector.create({
        providers: [
          {provide: 'row', useValue: row},
          {provide: 'cell', useValue: cell},
          {provide: 'cellKey', useValue: cellKey},
        ], parent: this.injector
      });
    };
  }

  createFilter(): (data: any, filterValue: string) => boolean {
    const filterFunction = function (data, filterValue): boolean {
      let searchTerms = filterValue;
      let isMatching = true;

      try {
        // TODO collect filtering functions and return matching items.
        // TODO able to define custome filtering function per column
        // TODO able to set dateRange Filter
        searchTerms = JSON.parse(filterValue);

        searchTerms.forEach((searchTerm) => {
          // console.log(searchTerm);
          // TODO: collect all searchTerms and combine it with the freeTextField search
        });

        isMatching = data.title.toLowerCase().indexOf(searchTerms.title.toLowerCase()) !== -1
          && data.description.toLowerCase().indexOf(searchTerms.description.toLowerCase()) !== -1;

      } catch (err) {
        isMatching = data.title.toLowerCase().indexOf(searchTerms.toLowerCase()) !== -1
          || data.description.toLowerCase().indexOf(searchTerms.toLowerCase()) !== -1;
      }

      return isMatching;
    };
    return filterFunction;
  }

  resetFilters() {
    this.filters.forEach((filter) => {
      filter.formControl.reset('');
    });
  }

  ngOnInit() {
    this.filterValues = this.headers.filter(header => header.isFilterable).map(header => header.id).reduce((o, key) => ({
      ...o,
      [key]: ''
    }), {});

    Object.keys(this.filterValues).forEach((filterableColumnName) => {
      const options = Array.from(new Set(this.data.map(row => row[filterableColumnName]))).map((value) => {
        return {value: value, viewValue: value};
      });

      options.unshift({value: '', viewValue: 'Show All'});

      const filter = {
        formControl: new FormControl(''),
        label: this.headers.filter(header => header.id === filterableColumnName)[0].label,
        options: options,
        filterKey: filterableColumnName
      };

      filter.formControl.valueChanges
        .subscribe(
          newValue => {
            this.filterValues[filterableColumnName] = newValue;

            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
        );

      this.filters.push(filter);
    });


    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.headers.map(header => header.id);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // this.dataSource.filterPredicate = this.createFilter();
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
