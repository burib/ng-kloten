import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../api/api.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getItems']);
  const apiServiceGetItemsSpy = jasmine.createSpyObj('getItems', ['subscribe']);

  beforeEach(async(() => {
    apiServiceSpy.getItems.and.returnValue(apiServiceGetItemsSpy);
    apiServiceGetItemsSpy.subscribe.and.returnValue({
      id: 1234
    });

    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
