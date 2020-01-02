import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiBaseUrl = '/api/prefix/v1';

  constructor(private httpClient: HttpClient) {}

  getItems(id: string = '') {
    const urlToGet = id.length > 0 ? `${this.apiBaseUrl}/todos/${id}` : `${this.apiBaseUrl}/todos`;

    return this
      .httpClient
      .get(urlToGet);
  }
}
