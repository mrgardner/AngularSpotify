import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoginCallbackComponent } from '@app/components/login-callback/login-callback.component';

describe('CallbackComponent', () => {
  let component: LoginCallbackComponent;
  let fixture: ComponentFixture<LoginCallbackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginCallbackComponent
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: { fragment: '' }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCallbackComponent);
    component = fixture.componentInstance;
  });

  it('should create callback component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit with fragment that does have access_token', () => {
    // component._window = {
    //   opener: {
    //     spotifyCallback: () => { }
    //   }
    // };
    // TestBed.inject(ActivatedRoute).fragment = of('#access_token=123&token_type=123&expires_in=3600&state=123');
    // component.ngOnInit();
    // expect(component).toBeTruthy();
  });

  it('should check ngOnInit with fragment that does not have access_token', () => {
    // component._window = {
    //   opener: {
    //     spotifyCallback: () => { }
    //   }
    // };
    // TestBed.inject(ActivatedRoute).fragment = of('test');
    // component.ngOnInit();
    // expect(component).toBeTruthy();
  });
});