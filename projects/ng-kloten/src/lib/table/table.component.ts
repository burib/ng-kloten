// app.component.ts

import {FormControl} from '@angular/forms';
import {Component, OnInit, ViewChild, Input, Injector} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface FiltersInterface {
  label: string;
  options?: { value: any; viewValue: string }[];
  formControl: FormControl;
  filterKey: string;
}

@Component({
  selector: 'ngkl-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  filters: FiltersInterface[];
  filterValues: { value: string, viewValue: string };

  @Input() data: any[] = [];
  @Input() headers: any[] = [];
  @Input() pageSize = 25;
  @Input() pageSizeOptions = [10, 25, 50, 100];

  dataSource: any;
  displayedColumns: string[];
  getInjector: any;

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

  private getDataSource() {
    return this.dataSource && this.dataSource.filteredData || this.data;
  }

  createFilter(): (data: any, filterValue: string) => void {
    const filterFunction = (dataSource, filterValue: string = ''): boolean => {
      let searchTerms: string | any;
      let isMatching = true;

      try {
        // TODO able to define custome filtering function per column
        // TODO able to set dateRange Filter
        searchTerms = JSON.parse(filterValue);

        const searchTermValues = Object.entries(searchTerms);

        searchTermValues.forEach((filterObj) => {
          const key = filterObj[0];
          const value = filterObj[1].toString();

          isMatching = dataSource[key].toLowerCase().includes(value.toLowerCase());
        });

        return isMatching;
      } catch (err) {
        searchTerms = filterValue;

        const searchableColumns = this.headers.filter(header => typeof header.isNotSearchable === 'undefined' || !header.isNotSearchable).map(header => header.id);
        const searchableFields = this.getDataSource().map((dataField) => {
          if (dataField) {
            return dataField;
          }
        });

        isMatching = searchableFields.map(value => (Object.values(value) || '').toString().toLowerCase()).join(' ').includes(searchTerms);
      }

      return isMatching;
    };

    return filterFunction;
  }

  resetFilters() {
    this.filters.forEach((filter: FiltersInterface) => {
      filter.formControl.reset('');
    });

    this.applyFilter('');
    this.reRenderFilterSelectOptions(null);
  }

  ngOnInit() {
    this.filterValues = this.headers.filter(header => header.isFilterable).map(header => header.id).reduce((o, key) => ({
      ...o,
      [key]: ''
    }), {});

    this.dataSource = new MatTableDataSource(this.data);
    this.displayedColumns = this.headers.map(header => header.id);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.initFilterValues();
    this.dataSource.filterPredicate = this.createFilter();
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getOptionsForFilterSelect(filterableColumnName: string) {
    const dataSource = this.getDataSource();
    const options = Array.from(new Set(dataSource.map(row => row[filterableColumnName]))).map((value) => {
      return {value: <any>value, viewValue: <string>value};
    }); // show options for the filters

    options.unshift({value: '', viewValue: 'Show All'});

    return options;
  }

  private reRenderFilterSelectOptions(actualKey): void {
    this.filters.forEach((filter) => {
      if (filter.filterKey !== actualKey) {
        filter.options = this.getOptionsForFilterSelect(filter.filterKey);
      }
    });
  }

  private initFilterValues() {
    this.filters = [];
    Object.keys(this.filterValues).forEach((filterableColumnName) => {
      const filter: FiltersInterface = {
        formControl: new FormControl(''),
        options: this.getOptionsForFilterSelect(filterableColumnName),
        label: this.headers.filter(header => header.id === filterableColumnName)[0].label,
        filterKey: filterableColumnName
      };

      // when a filter is selected
      filter.formControl.valueChanges
        .subscribe(
          newValue => {
            this.filterValues[filterableColumnName] = newValue;
            const filterObj = {};


            Object.entries(this.filterValues).forEach((entries) => {
              const key: string = entries[0];
              const searchTerm: string = entries[1];

              if (searchTerm.length > 0) {
                filterObj[key] = searchTerm;

                this.dataSource.filter = JSON.stringify(filterObj);
              } else {
                delete this.filterValues[key];

                this.dataSource.filter = '';
              }
            });

            this.reRenderFilterSelectOptions(filterableColumnName);
          }
        );

      this.filters.push(filter);
    });
  }
}
