import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngkl-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() menuItems: Array<any> = [];
  breadcrumbList: Array<any> = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.listenRouting();
  }

  listenRouting() {
    let routerUrl: string, routerList: Array<any>, target: any;
    this.router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        this.breadcrumbList.length = 0;

        routerList = routerUrl.slice(1).split('/');

        routerList.forEach((router, index) => {
          target = this.menuItems.find(page => page.href.slice(1) === router);
          target = target || {
              title: routerList[index],
              href: routerList[index]
            };

          if (target) {
            this.breadcrumbList.push({
              title: target.title,
              href: (index === 0) ? target.href : `${this.breadcrumbList[index-1].href}/${target.href.slice(1)}`
            });
          }

          if (index+1 !== routerList.length) {
            target = target.children;
          }
        });
      }
    });
  }

}
