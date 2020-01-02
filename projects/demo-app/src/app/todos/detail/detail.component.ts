import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // to read id from query params
import { ApiService } from '../api/api.service'; // to call apiDataService

@Component({
  selector: 'demo-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: string;
  data: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.apiService
      .getItems(this.id)
      .subscribe((data) => {
        this.data = data;
      });
  }

}
