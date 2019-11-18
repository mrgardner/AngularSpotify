import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedSongsComponent } from './liked-songs.component';

describe('LikedSongsComponent', () => {
  let component: LikedSongsComponent;
  let fixture: ComponentFixture<LikedSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
