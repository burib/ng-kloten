import {Component, OnInit, Input, Injector, Type, InjectionToken} from '@angular/core';


@Component({
  selector: 'demo-app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  injectedRow: any;
  injectedCell: any;
  injectedCellKey: any;
  @Input() row;
  @Input() cell;
  @Input() cellKey;

  constructor(injector: Injector) {
    this.injectedRow = injector.get<any>(<any>'row');
    this.injectedCell = injector.get<any>(<any>'cell');
    this.injectedCellKey = injector.get<any>(<any>'cellKey');
  }

  ngOnInit() {
    this.row = this.row || this.injectedRow;
    this.cell = this.cell || this.injectedCell;
    this.cellKey = this.cellKey || this.injectedCellKey;

  }
}
