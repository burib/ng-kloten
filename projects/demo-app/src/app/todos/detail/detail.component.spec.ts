import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DetailComponent } from './detail.component';
import { ApiService } from '../api/api.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getItems']);
  const apiServiceGetItemsSpy = jasmine.createSpyObj('getItems', ['subscribe']);

  beforeEach(async(() => {
    apiServiceSpy.getItems.and.returnValue(apiServiceGetItemsSpy);
    apiServiceGetItemsSpy.subscribe.and.returnValue({
      id: 1234
    });

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DetailComponent ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call apiService to display the list items', () => {
    expect(apiServiceSpy.getItems).toHaveBeenCalled();
    expect(apiServiceGetItemsSpy.subscribe).toHaveBeenCalled();
  });
});
