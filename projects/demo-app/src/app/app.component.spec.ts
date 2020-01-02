import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AuthService} from 'ng-kloten';

describe('AppComponent', () => {
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
  authServiceSpy.isLoggedIn.and.returnValue(false);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have an empty list of menuItems when NOT loggedIn`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.ngOnInit();

    expect(app.isLoggedIn).toEqual(false);
    expect(app.menuItems.length).toEqual(0);
  });

  it(`should have 2 menuItems when loggedIn`, () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.ngOnInit();

    expect(app.isLoggedIn).toEqual(true);
    expect(app.menuItems.length).toEqual(2);
  });

  // it('should render navigation items', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //
  //   expect(compiled.querySelector('h1').textContent).toContain('NG-Kloten');
  // });
});
