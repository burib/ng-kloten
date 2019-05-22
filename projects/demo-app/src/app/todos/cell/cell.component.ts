import { Component, OnInit, Input, Injector } from '@angular/core';


@Component({
  selector: 'demo-app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  injectedRow:any;
  injectedCell:any;
  injectedCellKey:any;
  @Input() row;
  @Input() cell;
  @Input() cellKey;

  constructor(injector: Injector) {
    this.injectedRow = injector.get('row');
    this.injectedCell = injector.get('cell');
    this.injectedCellKey = injector.get('cellKey');
  }

  ngOnInit() {
    this.row = this.row || this.injectedRow;
    this.cell = this.cell || this.injectedCell;
    this.cellKey = this.cellKey || this.injectedCellKey;

  }
}
