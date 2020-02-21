// Components
import { PodcastsComponent } from '@components/collection/podcasts/podcasts.component';

// Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('PodcastsComponent', () => {
  let component: PodcastsComponent;
  let fixture: ComponentFixture<PodcastsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
