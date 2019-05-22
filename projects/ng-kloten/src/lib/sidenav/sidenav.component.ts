import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngkl-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() menuItems: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

}
