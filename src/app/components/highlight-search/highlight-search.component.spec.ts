// Components
import { HighlightSearchComponent } from '@components/highlight-search/highlight-search.component';

// Testing
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('HighlightSearchComponent', () => {
  let component: HighlightSearchComponent;
  let fixture: ComponentFixture<HighlightSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
