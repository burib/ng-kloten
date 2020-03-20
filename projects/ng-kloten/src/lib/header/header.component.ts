import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { IMenuItem } from './iMenuItem.type';

@Component({
  selector: 'ngkl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuItems: Array<IMenuItem> = [];
  @Input() logo?: string;
  @Input() showAuthActions?: boolean;
  // @Output() onToggleSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) {}
  ngOnInit() {}

  logout = () => {
    this.authService.logout();
  }

  isLoggedIn = () => {
    this.authService.isLoggedIn();
  }
}
