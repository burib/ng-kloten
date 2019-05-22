import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'ngkl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuItems: Array<any> = [];
  // @Output() onToggleSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) {}
  ngOnInit() {}

  logout = () => {
    this.authService.logout();
  }
}
