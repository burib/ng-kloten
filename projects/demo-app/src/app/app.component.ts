import {Component, OnInit} from '@angular/core';
import { AuthService } from 'ng-kloten';

@Component({
  selector: 'demo-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn: Boolean = false;
  menuItems: any = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.menuItems = [
        { title: 'Home', 'href': '/home' },
        { title: 'Todos', 'href': '/todos' }
      ];
    }
  }
}
