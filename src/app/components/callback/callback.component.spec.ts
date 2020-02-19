import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CallbackComponent } from './callback.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CallbackComponent
      ],
      providers: [
        {
         provide: ActivatedRoute, useValue: {fragment: ''}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
  });

  it('should create callback component', () => {
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit with fragment that does have access_token', () => {
    component._window = {
      opener: {
        spotifyCallback: () => {}
      }
    };
    TestBed.inject(ActivatedRoute).fragment = of('#access_token=123&token_type=123&expires_in=3600&state=123');
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should check ngOnInit with fragment that does not have access_token', () => {
    component._window = {
      opener: {
        spotifyCallback: () => {}
      }
    };
    TestBed.inject(ActivatedRoute).fragment = of('test');
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
});
