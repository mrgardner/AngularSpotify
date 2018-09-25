import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyStatusBarComponent } from './spotify-status-bar.component';

describe('SpotifyStatusBarComponent', () => {
  let component: SpotifyStatusBarComponent;
  let fixture: ComponentFixture<SpotifyStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyStatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
