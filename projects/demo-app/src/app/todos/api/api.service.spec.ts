import {TestBed} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
// Http testing module and mocking controller
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {ApiService} from './api.service';

describe('ApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
